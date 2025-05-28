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

// Function to fetch and transform Google Sheets data
const fetchGoogleSheetData = async (spreadsheetId, sheetName, apiKey) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network error: ${response.statusText}`);

    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length < 2) throw new Error("Insufficient data in sheet.");

    const headers = rows[0]; // First row: Subject labels
    const dataRows = rows.slice(1); // Remaining rows: student data

    const labels = dataRows.map(row => row[0] || `Student ${dataRows.indexOf(row) + 1}`);

    const datasets = headers.slice(1).map((subject, colIndex) => {
        const subjectData = dataRows.map(row => parseFloat(row[colIndex + 1]) || 0);
        return {
            label: subject,
            data: subjectData,
            labels
        };
    });

    return { labels, datasets };
};

export const SubjectWiseAnalysis = ({ email }) => {
    const [className, setClassName] = useState("");
    const [months, setMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [spreadsheetId, setSpreadsheetId] = useState(null);
    const [sheetName, setSheetName] = useState(null);
    const [subjectCharts, setSubjectCharts] = useState([]);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_Google_api_key;

    // Step 1: Get user class
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

    // Step 2: Get available months
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

    // Step 3: Get spreadsheet ID and sheet name for selected month
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

    // Step 4: Fetch Google Sheets data and create chart data for each subject
    useEffect(() => {
        const fetchChartData = async () => {
            if (!spreadsheetId || !sheetName) return;
            try {
                const { labels, datasets } = await fetchGoogleSheetData(spreadsheetId, sheetName, apiKey);

                const colors = [
                    "rgba(75, 192, 192, 1)",
                    "rgba(233, 45, 95, 1)",
                    "rgba(71, 68, 170, 1)",
                    "rgba(26, 34, 35, 1)",
                    "rgba(255, 165, 0, 1)",
                    "rgba(100, 255, 100, 1)",
                ];
                const bgColors = colors.map(c => c.replace("1)", "0.2)"));

                const charts = datasets.map((ds, index) => ({
                    label: ds.label,
                    data: {
                        labels,
                        datasets: [{
                            label: ds.label,
                            data: ds.data,
                            borderColor: colors[index % colors.length],
                            backgroundColor: bgColors[index % bgColors.length],
                            tension: 0.3,
                        }],
                    },
                }));

                setSubjectCharts(charts);
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
            <div className="flex items-center gap-4">
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
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full">
                {subjectCharts.length === 0 && !error && (
                    <p className="text-lg text-gray-500 text-center col-span-2">Loading charts...</p>
                )}
                {subjectCharts.map((chart, idx) => (
                    <div key={idx} className="bg-white rounded-[20px] p-4">
                        <Line data={chart.data} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: chart.label } } }} />
                    </div>
                ))}
            </div>
        </div>
    );
};
