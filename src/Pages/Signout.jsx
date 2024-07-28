import React from 'react';
import { useDispatch } from 'react-redux';
import { setValue } from '../store/booleanSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signout = () => {
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(setValue(true));
        toast.success("Signout Successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
        setTimeout(() => {
            goBack();
        }, 3000);
    }

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-5 ">
            <div className="flex flex-col items-center border border-gray-300 rounded-lg shadow-md p-4 sm:p-6 w-full max-w-xs sm:max-w-lg">
                <h1 className="text-lg sm:text-2xl text-center font-semibold mb-4 sm:mb-6">Are you sure you want to Signout?</h1>
                <div className="flex gap-2 sm:gap-4 w-full">
                    <button 
                        className="flex-1 bg-green-600 text-white rounded-md py-2 sm:py-3 text-sm sm:text-lg font-medium hover:bg-green-700 transition-all shadow-lg"
                        onClick={signout}
                    >
                        Signout
                    </button>
                    <button 
                        className="flex-1 bg-gray-600 text-white rounded-md py-2 sm:py-3 text-sm sm:text-lg font-medium hover:bg-gray-700 transition-all shadow-lg"
                        onClick={goBack}
                    >
                        Stay Signed In
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}
