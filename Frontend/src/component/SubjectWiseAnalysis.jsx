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
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network error: ${response.statusText}`);
        }
        const data = await response.json();
        const rows = data.values;

        if (!rows || rows.length === 0) throw new Error("No data found in the sheet.");

        // Process data: use first column as labels and second column as data points
        const labels = rows.map((row) => row[0]); // First column for X-axis
        const dataPoints1 = rows.map((row) => parseFloat(row[1])); // Second column for Y-axis
        const dataPoints2 = rows.map((row) => parseFloat(row[2])); // Second column for Y-axis
        const dataPoints3 = rows.map((row) => parseFloat(row[3])); // Second column for Y-axis
        const dataPoints4 = rows.map((row) => parseFloat(row[4])); // Second column for Y-axis

        return { labels, dataPoints1, dataPoints2, dataPoints3, dataPoints4 };
    } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
        throw error;
    }
};

export const SubjectWiseAnalysis = ({email}) => {

    const [chartData1, setChartData1] = useState(null);
    const [chartData2, setChartData2] = useState(null);
    const [chartData3, setChartData3] = useState(null);
    const [chartData4, setChartData4] = useState(null);
    const [error1, setError1] = useState(null);
    // const [error2, setError2] = useState(null);
    // const [error3, setError3] = useState(null);
    // const [error4, setError4] = useState(null);

    const [className,setClassName]=useState("");

    const [spreadsheetId,setSpreadSheetId]=useState(null);
    const [sheetName,setSheetName]=useState(null);
    // const spreadsheetId = "1T5on00YsX135CdVAhIJxzIp6gGa9GfeqAeFJ2ikmiYw"; // Replace with your ID
    // const sheetName = "10"; // Replace with your sheet/tab name
    const apiKey = import.meta.env.VITE_Google_api_key; // Replace with your Google API key

    const fetchCoachifyId= async ()=>{
        try{
            const response = await axios.get('/getCoachifyId', {
                params: { email }  // Sends email as a query parameter
            });
            console.log(response);
            console.log(response.data.coachifyId);
            const tempclassname=response.data.coachifyId.slice(1,4);
            console.log(tempclassname);
            setClassName(tempclassname);
            fetchSheetDetails(tempclassname);
        }
        catch(error){
            console.log(error);
            console.log("Error in fetching coachifyId");
        }
    }

    const fetchSheetDetails=async (className)=>{
        try{
            const response=await axios.get('/getSheetDetails',{
                params:{className}
            });
            // console.log("sheet reponse ",response);
            console.log(response.data.sheetDetails);
            console.log(response.data.sheetDetails.sheetId);
            console.log(response.data.sheetDetails.sheetName);
            setSpreadSheetId(response.data.sheetDetails.sheetId);
            setSheetName(response.data.sheetDetails.sheetName);
        }
        catch(error){
            console.log(error);
            console.log("Error in fetching fetching sheet details");
        }
    }


    useEffect(() => {

        if (!spreadsheetId || !sheetName) return;
        const fetchData = async () => {
            try {
                const { labels, dataPoints1, dataPoints2, dataPoints3, dataPoints4 } = await fetchGoogleSheetData(spreadsheetId, sheetName, apiKey);

                // Construct chart data
                setChartData1({
                    labels,
                    datasets: [
                        {
                            label: "Maths",
                            data: dataPoints1,
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            pointBackgroundColor: "rgba(75, 192, 192, 1)",
                            pointBorderColor: "#fff",
                            tension: 0.2, // Slight curve for a smooth line
                        },
                    ],
                });
                setChartData2({
                    labels,
                    datasets: [

                        {
                            label: "Physics",
                            data: dataPoints2,
                            borderColor: "rgba(233, 45, 95, 1)",
                            backgroundColor: "rgba(233, 45, 95, 0.2)",
                            pointBackgroundColor: "rgba(233, 45, 95, 1)",
                            pointBorderColor: "#fff",
                            tension: 0.2,
                        },
                    ],
                });
                setChartData3({
                    labels,
                    datasets: [
                        {
                            label: "Chemistry",
                            data: dataPoints3,
                            borderColor: "rgba(71, 68, 170, 1)",
                            backgroundColor: "rgba(71, 68, 170, 0.2)",
                            pointBackgroundColor: "rgba(71, 68, 170, 1)",
                            pointBorderColor: "#fff",
                            tension: 0.2,
                        }
                    ],
                });
                setChartData4({
                    labels,
                    datasets: [
                        {
                            label: "Overall Marks",
                            data: dataPoints4,
                            borderColor: "rgba(26, 34, 35, 1)",
                            backgroundColor: "rgba(26, 34, 35, 0.2)",
                            pointBackgroundColor: "rgba(26, 34, 35, 1)",
                            pointBorderColor: "#fff",
                            tension: 0.2, // Slight curve for a smooth line
                        },
                    ],
                });
            } catch (err) {
                setError1(err.message);
            }
        };

        fetchData();
    }, [spreadsheetId, sheetName, apiKey]);

    useEffect(()=>{
            fetchCoachifyId();
        },[]);

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
        <div className='flex flex-col items-center  justify-center h-full gap-2 sm:w-auto w-[900px]'>
            <div className='flex sm:flex-row flex-col h-1/2 w-full gap-2'>
                <div className='bg-white h-[300px] sm:h-full sm:w-1/2 rounded-[20px] flex justify-center items-center'>
                    {error1 && <p style={{ color: "red" }}>Error: {error1}</p>}
                    {chartData1 ? <Line data={chartData1} options={options} /> : <p>Loading...</p>}
                </div>
                <div className='bg-white h-[300px] sm:h-full sm:w-1/2 rounded-[20px] flex justify-center items-center'>
                    {chartData2 ? <Line data={chartData2} options={options} /> : <p>Loading...</p>}
                </div>
            </div>
            <div className='flex sm:flex-row flex-col h-1/2 w-full gap-2'>
                <div className='bg-white h-[300px] sm:h-full sm:w-1/2 rounded-[20px] flex justify-center items-center'>
                    {chartData3 ? <Line data={chartData3} options={options} /> : <p>Loading...</p>}
                </div>
                <div className='bg-white h-[300px] sm:h-full sm:w-1/2 rounded-[20px] flex justify-center items-center'>
                    {chartData4 ? <Line data={chartData4} options={options} /> : <p>Loading...</p>}
                </div>
            </div>
        </div>
    )
}
