import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url;

export const UploadSheetData = () => {
  const [sheetData, setSheetData] = useState({
    className: "",
    sheetId: "",
    sheetName: "",
    month: ""
  });

  const [errorMessge, setErrorMessage] = useState("");

  function changeHandler(event) {
    const { name, value } = event.target;
    setSheetData((prev) => ({ ...prev, [name]: value }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      console.log(sheetData);
      const token = localStorage.getItem('Token');
      if (!token) {
        console.error("No token found, authentication required!");
        return;
      }

      const response = await axios.post('/addSheetDetails', sheetData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSheetData({
        className: "",
        sheetId: "",
        sheetName: "",
        month: ""
      });
      setErrorMessage("");
      toast.success("Sheet Details Added Sucessfully");
    } catch (error) {
      // console.log(error.response?.data?.message);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong")
      console.error("Error adding sheet:", error.response?.data || error.message);
    }

  }

  return (
    <div className="flex flex-col p-4 md:p-8 h-auto">
      <form onSubmit={submitHandler} className="w-full" autoComplete="off">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Section */}
          <div className="flex flex-col w-full md:w-1/2">
            <div className="mb-4 p-2 md:p-4">
              <label htmlFor="className" className="block text-white text-xl md:text-3xl mb-2">Class/Batch</label>
              <input
                type="text"
                id="className"
                name="className"
                className="w-full p-2 rounded-lg bg-[rgba(217,217,217,0.28)] text-white text-xl md:text-3xl"
                value={sheetData.className}
                onChange={changeHandler}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4 p-2 md:p-4">
              <label htmlFor="sheetId" className="block text-white text-xl md:text-3xl mb-2">Sheet Id</label>
              <input
                type="text"
                id="sheetId"
                name="sheetId"
                className="w-full p-2 rounded-lg bg-[rgba(217,217,217,0.28)] text-white text-xl md:text-3xl"
                value={sheetData.sheetId}
                onChange={changeHandler}
                required
                autoComplete="off"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col w-full md:w-1/2">
            <div className="mb-4 p-2 md:p-4">
              <label htmlFor="sheetName" className="block text-white text-xl md:text-3xl mb-2">Sheet Name</label>
              <input
                type="text"
                id="sheetName"
                name="sheetName"
                className="w-full p-2 rounded-lg bg-[rgba(217,217,217,0.28)] text-white text-xl md:text-3xl"
                value={sheetData.sheetName}
                onChange={changeHandler}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4 p-2 md:p-4">
              <label htmlFor="month" className="block text-white text-xl md:text-3xl mb-2">
                Test Name <p className="text-base">(Prelims, Mains, Advance)</p>
              </label>
              <input
                type="text"
                id="month"
                name="month"
                className="w-full p-2 rounded-lg bg-[rgba(217,217,217,0.28)] text-white text-xl md:text-3xl"
                value={sheetData.month}
                onChange={changeHandler}
                required
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="bg-green-600 text-white text-xl md:text-3xl py-2 px-4 rounded-lg">
            Upload Sheet Details
          </button>
        </div>
      </form>
      <ToastContainer className="text-base" />
      {errorMessge && <p className="text-red-600 text-xl mt-4">{errorMessge}</p>}
    </div>
  );
};
