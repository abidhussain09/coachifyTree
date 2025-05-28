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

// 🎨 Utility to assign distinct colors to subjects
const getColorForIndex = (index) => {
    const colors = [
        "rgba(75, 192, 192, 1)",
        "rgba(233, 45, 95, 1)",
        "rgba(71, 68, 170, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
    ];
    return colors[index % colors.length];
};

// ✅ Fetch Google Sheet data with dynamic headers and datasets
const fetchGoogleSheetData = async (spreadsheetId, sheetName, apiKey) => {
    const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length < 2) throw new Error("Not enough data");

    const headers = rows[0]; // First row: subject names (["Student ID", "Maths", "Physics", "Chemistry"])
    const dataRows = rows.slice(1); // Remaining rows: student scores

    const labels = dataRows.map(row => row[0]); // Student IDs

    const datasets = headers.slice(1).map((subject, colIndex) => ({
        label: subject,
        data: dataRows.map(row => parseFloat(row[colIndex + 1]) || 0),
        backgroundColor: getColorForIndex(colIndex),
    }));

    return { labels, datasets };
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
                const { labels, datasets } = await fetchGoogleSheetData(
                    spreadsheetId,
                    sheetName,
                    apiKey
                );
                setChartData({ labels, datasets });
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
                    className="text-black border-2 border-solid border-black text-2xl px-4 py-2 rounded"
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
