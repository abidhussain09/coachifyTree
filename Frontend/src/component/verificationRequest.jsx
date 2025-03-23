import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL
export const VerificationRequest = ({ email, name }) => {
    const [coachifyId, setCoachifyId] = useState("");
    const [message ,setMessage]=useState(null);
    const [error,setError]=useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post("/requestCoachifyVerification", {
                name,
                email,
                coachifyId,
            });
            // console.log(response);
            // console.log(response.data.message);
            setMessage(response.data.message);
        } catch (error) {
            console.log("Error sending verification request:", error);
            // console.log(error.response.data.message);
            setError(error.response.data.message);
        }
        setCoachifyId("");
    };

    return (
        <div className="flex flex-col  justify-center p-8 gap-6">
            <div>
            <h2 className="text-4xl">Verification Required</h2>
            <h3 className="text-2xl">To acess this functionality you need to verify yourself by entering the Id below</h3>
            </div>
            <div className="flex flex-col gap-4">
            <p className="text-xl">Please enter your Coachify ID to request verification.</p>
            <input
                type="text"
                placeholder="Enter Coachify ID"
                value={coachifyId}
                onChange={(e) => setCoachifyId(e.target.value)}
                className="p-2 border rounded text-black text-xl w-1/2"
                />
            <button onClick={handleSubmit} className="px-3 py-2 text-white rounded text-xl bg-[#63a73a] w-fulltext-aliceblue itim font-roboto hover:bg-green-600 transition duration-300 w-1/2">
                Submit Request
            </button>
            </div>
            <div className="text-lg">If you have entered the wrong CoachifyId, please enter again we will update the request</div>
            {
                message && <div className="text-green-500 text-wrap text-xl ">
                    {message}
                </div>
            }
            {
                error && 
                    <div className="text-red-500 text-wrap text-xl">{error}</div>
                
            }
        </div>
    );
};
