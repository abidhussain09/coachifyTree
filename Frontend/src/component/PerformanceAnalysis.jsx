import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const fetchGoogleSheetData = async (spreadsheetId, sheetName, apiKey) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const rows = response.data.values;

        if (!rows || rows.length === 0) throw new Error("No data found in the sheet.");

        // Process data: use first column as labels and second column as data points
        const labels = rows.map((row) => row[0]); // First column for X-axis
        const dataPoints1 = rows.map((row) => parseFloat(row[1])); // Second column for Y-axis
        const dataPoints2 = rows.map((row) => parseFloat(row[2])); // Second column for Y-axis
        const dataPoints3 = rows.map((row) => parseFloat(row[3])); // Second column for Y-axis

        return { labels, dataPoints1, dataPoints2, dataPoints3 };
    } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
        throw error;
    }
};

export const PerformanceAnalysis = () => {

    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    const spreadsheetId = "1T5on00YsX135CdVAhIJxzIp6gGa9GfeqAeFJ2ikmiYw"; // Replace with your ID
    const sheetName = "10"; // Replace with your sheet/tab name
    const apiKey = "AIzaSyDHAp5T2l9GOyQmlHlhD_6fgbIOmY2IaYs"; // Replace with your Google API key

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { labels, dataPoints1, dataPoints2, dataPoints3 } = await fetchGoogleSheetData(spreadsheetId, sheetName, apiKey);

                // Construct chart data
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Maths",
                            data: dataPoints1,
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 1)",
                            pointBackgroundColor: "rgba(75, 192, 192, 1)",
                            pointBorderColor: "#fff",
                            tension: 0.2, // Slight curve for a smooth line
                            type: "bar",
                        },
                        {
                            label: "Physics",
                            data: dataPoints2,
                            borderColor: "rgba(233, 45, 95, 1)",
                            backgroundColor: "rgba(233, 45, 95, 1)",
                            pointBackgroundColor: "rgba(233, 45, 95, 1)",
                            pointBorderColor: "#fff",
                            tension: 0.2,
                            type: "bar",
                        },
                        {
                            label: "Chemistry",
                            data: dataPoints3,
                            borderColor: "rgba(71, 68, 170, 1)",
                            backgroundColor: "rgba(71, 68, 170, 1)",
                            pointBackgroundColor: "rgba(71, 68, 170, 1)",
                            pointBorderColor: "#fff",
                            tension: 0.2,
                            type: "bar",
                        }
                    ],
                });
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [spreadsheetId, sheetName, apiKey]);

    // Chart configuration options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Subject Wise Marks",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Student I'd",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Marks Obtained",
                },
                beginAtZero: true,
            },
        },
    };


    return (
        <div className='flex items-center justify-center h-full bg-white rounded-[20px]'>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
        </div>
    )
}
