import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchGoogleSheetData = async (spreadsheetId, sheetName, apiKey) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
    
    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length === 0) throw new Error("No data found in the sheet.");

    const dataRows = rows.length > 1 && isNaN(rows[0][1]) ? rows.slice(1) : rows;

    const labels = dataRows.map((row) => row[0]);
    const dataPoints1 = dataRows.map((row) => parseFloat(row[1]) || 0);
    const dataPoints2 = dataRows.map((row) => parseFloat(row[2]) || 0);
    const dataPoints3 = dataRows.map((row) => parseFloat(row[3]) || 0);
    const dataPoints4 = dataRows.map((row) => parseFloat(row[4]) || 0);

    return { labels, dataPoints1, dataPoints2, dataPoints3, dataPoints4 };
};

export const SubjectWiseAnalysis = ({ email }) => {
    const [className, setClassName] = useState("");
    const [months, setMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [spreadsheetId, setSpreadsheetId] = useState(null);
    const [sheetName, setSheetName] = useState(null);
    const [chartData1, setChartData1] = useState(null);
    const [chartData2, setChartData2] = useState(null);
    const [chartData3, setChartData3] = useState(null);
    const [chartData4, setChartData4] = useState(null);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_Google_api_key;

    useEffect(() => {
        const fetchClassName = async () => {
            try {
                const res = await axios.get("/getCoachifyId", { params: { email } });
                const code = res.data.coachifyId.slice(1, 4);
                setClassName(code);
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
                setSelectedMonth(res.data.months?.[0] || "");
            } catch (err) {
                console.error("Error fetching months:", err);
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
                setSpreadsheetId(response.data.sheet.sheetId);
                setSheetName(response.data.sheet.sheetName);
            } catch (err) {
                console.error("Error fetching sheet details:", err);
                setError("Could not fetch sheet for selected month");
            }
        };
        fetchSheetDetails();
    }, [selectedMonth, className]);

    useEffect(() => {
        const fetchChartData = async () => {
            if (!spreadsheetId || !sheetName) return;
            try {
                const { labels, dataPoints1, dataPoints2, dataPoints3, dataPoints4 } =
                    await fetchGoogleSheetData(spreadsheetId, sheetName, apiKey);

                setChartData1({
                    labels,
                    datasets: [{
                        label: "Maths",
                        data: dataPoints1,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.3,
                    }],
                });
                setChartData2({
                    labels,
                    datasets: [{
                        label: "Physics",
                        data: dataPoints2,
                        borderColor: "rgba(233, 45, 95, 1)",
                        backgroundColor: "rgba(233, 45, 95, 0.2)",
                        tension: 0.3,
                    }],
                });
                setChartData3({
                    labels,
                    datasets: [{
                        label: "Chemistry",
                        data: dataPoints3,
                        borderColor: "rgba(71, 68, 170, 1)",
                        backgroundColor: "rgba(71, 68, 170, 0.2)",
                        tension: 0.3,
                    }],
                });
                setChartData4({
                    labels,
                    datasets: [{
                        label: "Overall",
                        data: dataPoints4,
                        borderColor: "rgba(26, 34, 35, 1)",
                        backgroundColor: "rgba(26, 34, 35, 0.2)",
                        tension: 0.3,
                    }],
                });
            } catch (err) {
                console.error("Chart data fetch failed:", err);
                setError("Failed to load chart data");
            }
        };
        fetchChartData();
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
            <div className="flex items-center  gap-4">
                <label htmlFor="monthSelect" className="text-2xl font-semibold">
                    Select Month:
                </label>
                <select
                    id="monthSelect"
                    className="text-black border-2 border-solid border-black text-2xl px-4 py-2 rounded"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">-- Select --</option>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full">
                <div className="bg-white rounded-[20px] p-4">
                    {chartData1 ? <Line data={chartData1} options={options} /> : <p>Loading Maths...</p>}
                </div>
                <div className="bg-white rounded-[20px] p-4">
                    {chartData2 ? <Line data={chartData2} options={options} /> : <p>Loading Physics...</p>}
                </div>
                <div className="bg-white rounded-[20px] p-4">
                    {chartData3 ? <Line data={chartData3} options={options} /> : <p>Loading Chemistry...</p>}
                </div>
                <div className="bg-white rounded-[20px] p-4">
                    {chartData4 ? <Line data={chartData4} options={options} /> : <p>Loading Overall...</p>}
                </div>
            </div>
        </div>
    );
};
