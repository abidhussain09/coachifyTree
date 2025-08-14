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
      const token = localStorage.getItem('Token');
      if (!token) {
        console.error("No token found, authentication required!");
        return;
      }

      await axios.post('/addSheetDetails', sheetData, {
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
      toast.success("Sheet Details Added Successfully");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700 p-6 md:p-10">
        <h2 className="text-center text-3xl md:text-4xl text-white font-bold mb-8" style={{ fontFamily: 'Itim, cursive' }}>
          Upload Sheet Details
        </h2>

        <form onSubmit={submitHandler} className="space-y-6" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class/Batch */}
            <div>
              <label htmlFor="className" className="block text-white text-lg md:text-xl mb-2 font-medium" style={{ fontFamily: 'Itim, cursive' }}>
                Class/Batch
              </label>
              <input
                type="text"
                id="className"
                name="className"
                className="w-full p-3 rounded-lg bg-[rgba(217,217,217,0.15)] border border-neutral-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none text-white text-lg placeholder-gray-400"
                value={sheetData.className}
                onChange={changeHandler}
                required
              />
            </div>

            {/* Sheet ID */}
            <div>
              <label htmlFor="sheetId" className="block text-white text-lg md:text-xl mb-2 font-medium" style={{ fontFamily: 'Itim, cursive' }}>
                Sheet Id
              </label>
              <input
                type="text"
                id="sheetId"
                name="sheetId"
                className="w-full p-3 rounded-lg bg-[rgba(217,217,217,0.15)] border border-neutral-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none text-white text-lg placeholder-gray-400"
                value={sheetData.sheetId}
                onChange={changeHandler}
                required
              />
            </div>

            {/* Sheet Name */}
            <div>
              <label htmlFor="sheetName" className="block text-white text-lg md:text-xl mb-2 font-medium" style={{ fontFamily: 'Itim, cursive' }}>
                Sheet Name
              </label>
              <input
                type="text"
                id="sheetName"
                name="sheetName"
                className="w-full p-3 rounded-lg bg-[rgba(217,217,217,0.15)] border border-neutral-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none text-white text-lg placeholder-gray-400"
                value={sheetData.sheetName}
                onChange={changeHandler}
                required
              />
            </div>

            {/* Test Name */}
            <div>
              <label htmlFor="month" className="block text-white text-lg md:text-xl mb-1 font-medium" style={{ fontFamily: 'Itim, cursive' }}>
                Test Name
              </label>
              <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Itim, cursive' }}>
                (Prelims, Mains, Advance)
              </p>
              <input
                type="text"
                id="month"
                name="month"
                className="w-full p-3 rounded-lg bg-[rgba(217,217,217,0.15)] border border-neutral-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none text-white text-lg placeholder-gray-400"
                value={sheetData.month}
                onChange={changeHandler}
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 transition-colors text-white text-lg md:text-xl py-3 px-8 rounded-lg shadow-md font-medium"
              style={{ fontFamily: 'Itim, cursive' }}
            >
              Upload Sheet Details
            </button>
          </div>
        </form>

        {errorMessge && <p className="text-red-500 text-center mt-6 text-lg" style={{ fontFamily: 'Itim, cursive' }}>{errorMessge}</p>}

        <ToastContainer className="text-base" />
      </div>
    </div>
  );
};
