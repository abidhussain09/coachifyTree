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

  const [errorMessage, setErrorMessage] = useState("");

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

  const InputField = ({ label, name, value, placeholder, subLabel }) => (
    <div className="mb-4 p-2 md:p-4">
      <label htmlFor={name} className="block text-white text-lg md:text-2xl mb-2">
        {label}
        {subLabel && <p className="text-sm text-slate-400">{subLabel}</p>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg bg-[rgba(217,217,217,0.15)] border border-neutral-600 focus:border-[#63a73a] focus:ring-2 focus:ring-[#63a73a] outline-none text-white text-lg md:text-xl placeholder-gray-400"
        value={value}
        onChange={changeHandler}
        required
        autoComplete="off"
      />
    </div>
  );

  return (
    <div className="flex justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700 pb-4">
        <h2 className="text-center text-2xl md:text-4xl text-white font-semibold py-6 border-b border-neutral-700">
          Upload Sheet Details
        </h2>

        <form onSubmit={submitHandler} className="w-full" autoComplete="off">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Section */}
            <div className="flex flex-col w-full md:w-1/2">
              <InputField
                label="Class/Batch"
                name="className"
                value={sheetData.className}
                placeholder="Eg: Class 9 A"
              />
              <InputField
                label="Sheet Id"
                name="sheetId"
                value={sheetData.sheetId}
                placeholder="Enter Google Sheet ID"
              />
            </div>

            {/* Right Section */}
            <div className="flex flex-col w-full md:w-1/2">
              <InputField
                label="Sheet Name"
                name="sheetName"
                value={sheetData.sheetName}
                placeholder="Eg: Physics Test Sheet"
              />
              <InputField
                label="Test Name"
                name="month"
                subLabel="(Prelims, Mains, Advance)"
                value={sheetData.month}
                placeholder="Eg: Prelims - Jan"
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-[#63a73a] hover:bg-[#4f8c2f] transition-colors text-white text-lg md:text-xl py-2 px-6 rounded-lg shadow-md"
            >
              Upload Sheet
            </button>
          </div>
        </form>

        {errorMessage && (
          <p className="text-red-500 text-lg text-center mt-4">{errorMessage}</p>
        )}

        <ToastContainer className="text-base" />
      </div>
    </div>
  );
};
