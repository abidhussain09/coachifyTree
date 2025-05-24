import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ✅ FIXED: Replaced "url" with "sheetUrl"
const fetchGoogleSheetData = async (spreadsheetId, sheetName, apiKey) => {
    const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
    const response = await fetch(sheetUrl); // <-- fixed here
    if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
    const data = await response.json();
    const rows = data.values;

    const dataRows = rows.length > 1 && isNaN(rows[0][1]) ? rows.slice(1) : rows;

    const labels = dataRows.map((row) => row[0]);
    const dataPoints1 = dataRows.map((row) => parseFloat(row[1]) || 0);
    const dataPoints2 = dataRows.map((row) => parseFloat(row[2]) || 0);
    const dataPoints3 = dataRows.map((row) => parseFloat(row[3]) || 0);

    return { labels, dataPoints1, dataPoints2, dataPoints3 };
};

export const PerformanceAnalysis = ({ email }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
    const [className, setClassName] = useState("");
    const [months, setMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [spreadsheetId, setSpreadsheetId] = useState(null);
    const [sheetName, setSheetName] = useState(null);

    const apiKey = import.meta.env.VITE_Google_api_key;

    useEffect(() => {
        const fetchClassName = async () => {
            try {
                const res = await axios.get("/getCoachifyId", { params: { email } });
                if (res.data.coachifyId && res.data.coachifyId.length >= 3) {
                    const classCode = res.data.coachifyId.slice(1, 4);
                    setClassName(classCode);
                } else {
                    throw new Error("Invalid coachifyId format");
                }
            } catch (err) {
                console.error("Failed to fetch className:", err);
                setError("Could not fetch class info");
            }
        };
        if (email) fetchClassName();
    }, [email]);

    useEffect(() => {
        const fetchMonths = async () => {
            if (!className) return;
            try {
                const res = await axios.get("/sheets/getMonths", { params: { className } });
                setMonths(res.data.months || []);
                if (res.data.months && res.data.months.length > 0) {
                    setSelectedMonth(res.data.months[0]);
                } else {
                    setSelectedMonth("");
                }
            } catch (err) {
                console.error("Error fetching months:", err);
                setMonths([]);
                setSelectedMonth("");
                setError("No months available");
            }
        };
        fetchMonths();
    }, [className]);

    useEffect(() => {
        const fetchSheetDetails = async () => {
            if (!className || !selectedMonth) return;

            try {
                const response = await axios.get("/sheets/getSheetByMonth", {
                    params: { className, month: selectedMonth },
                });
                const { sheetId, sheetName } = response.data.sheet;
                setSpreadsheetId(sheetId);
                setSheetName(sheetName);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch sheet:", err);
                setError("Could not load sheet for selected month");
                setSpreadsheetId(null);
                setSheetName(null);
            }
        };
        fetchSheetDetails();
    }, [selectedMonth, className]);

    useEffect(() => {
        if (!spreadsheetId || !sheetName) return;

        const fetchData = async () => {
            try {
                const { labels, dataPoints1, dataPoints2, dataPoints3 } = await fetchGoogleSheetData(
                    spreadsheetId,
                    sheetName,
                    apiKey
                );
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Maths",
                            data: dataPoints1,
                            backgroundColor: "rgba(75, 192, 192, 1)",
                        },
                        {
                            label: "Physics",
                            data: dataPoints2,
                            backgroundColor: "rgba(233, 45, 95, 1)",
                        },
                        {
                            label: "Chemistry",
                            data: dataPoints3,
                            backgroundColor: "rgba(71, 68, 170, 1)",
                        },
                    ],
                });
                setError(null);
            } catch (err) {
                console.error("Chart data fetch failed:", err);
                setError("Failed to load chart data");
                setChartData(null);
            }
        };
        fetchData();
    }, [spreadsheetId, sheetName]);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Subject Wise Marks" },
        },
        scales: {
            x: { title: { display: true, text: "Student ID" } },
            y: { beginAtZero: true, title: { display: true, text: "Marks" } },
        },
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center h-auto w-[900px] sm:w-auto bg-white rounded-[20px] p-4">
            <div className="flex items-center gap-2">
                <label htmlFor="monthSelect" className="text-gray text-2xl font-semibold">
                    Select Month:
                </label>
                <select
                    id="monthSelect"
                    className=" text-black border text-2xl px-4 py-2 rounded"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">-- Select --</option>
                    {months && months.length > 0 ? (
                        months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))
                    ) : (
                        <option disabled>No months available</option>
                    )}
                </select>
            </div>

            {error && <p className="text-red-500">Error: {error}</p>}

            {chartData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};
