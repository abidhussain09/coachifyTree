import React, { useState } from 'react';

export const UploadSheetData = () => {
    const [sheetData, setSheetData] = useState({
        className: "",
        sheetId: "",
        sheetName: "",
        testNumber: ""
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setSheetData((prev) => ({ ...prev, [name]: value }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        console.log(sheetData);
        setSheetData({
            className: "",
            sheetId: "",
            sheetName: "",
            testNumber: ""
        });
    }

    return (
        <div className="flex p-8 min-h-screen ">
            <form  onSubmit={submitHandler}>
                <div className='flex p-1'>
                <div className='flex flex-col p-4'>
                <div className="mb-4 p-4">
                    <label htmlFor="className" className="block text-white text-3xl mb-2">Class</label>
                    <select
                        id="className"
                        name="className"
                        className="w-full p-2  rounded-lg bg-[rgba(217,217,217,0.28)] text-3xl text-white"
                        value={sheetData.className}
                        onChange={changeHandler}
                    >
                        <option value="" disabled>Select Class</option>
                        <option className="bg-gray-500 " value="10">Class 10</option>
                        <option className="bg-gray-500 " value="09">Class 09</option>
                        <option className="bg-gray-500 " value="08">Class 08</option>
                        <option className="bg-gray-500 " value="07">Class 07</option>
                    </select>
                </div>
                <div className="mb-4 p-4">
                    <label htmlFor="sheetId" className="block text-white text-3xl mb-2">Sheet Id</label>
                    <input
                        type="text"
                        id="sheetId"
                        name="sheetId"
                        className="w-full p-2 rounded-lg bg-[rgba(217,217,217,0.28)] text-white"
                        value={sheetData.sheetId}
                        onChange={changeHandler}
                    />
                </div>
                </div>
                <div className='flex flex-col justify-center p-4'>
                <div className="mb-4 p-4">
                    <label htmlFor="sheetName" className="block text-3xl text-white mb-2">Sheet Name</label>
                    <input
                        type="text"
                        id="sheetName"
                        name="sheetName"
                        className="w-full p-2 rounded-lg bg-[rgba(217,217,217,0.28)] text-white"
                        value={sheetData.sheetName}
                        onChange={changeHandler}
                    />
                </div>
                <div className="mb-4 p-4">
                    <label htmlFor="testNumber" className="block text-3xl text-white mb-2">Test No.</label>
                    <input
                        type="text"
                        id="testNumber"
                        name="testNumber"
                        className="w-full p-2 rounded-lg bg-[rgba(217,217,217,0.28)] text-white"
                        value={sheetData.testNumber}
                        onChange={changeHandler}
                    />
                </div>
                </div>
                </div>
                <div className="text-center ">
                    <button type="submit" className="bg-green-600 text-white text-3xl py-2 px-4 rounded-lg">Update Sheet</button>
                </div>
            </form>
        </div>
    );
};
