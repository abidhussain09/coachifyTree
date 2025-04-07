import React from 'react';
import { useDispatch } from 'react-redux';
import { setValue } from '../store/booleanSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signout = () => {
    const dispatch = useDispatch();

    const signout = () => {
        localStorage.removeItem('Token');
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
        }, 2000);
    }

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="flex items-center justify-center w-screen h-[80vh] p-2 sm:p-5 ">
            <div className="flex flex-col bg-black items-center border-2 border-dashed border-neutral-700 rounded-lg shadow-md sm:mx-0 sm:w-1/3 py-8 px-4">
                <h1 className="text-2xl sm:text-3xl itim text-center font-semibold mb-4 sm:mb-6">Are you sure you want to Signout?</h1>
                <div className="flex flex-col gap-2 sm:gap-4 w-full">
                    <button 
                        className="flex-1 itim bg-green-600 text-white rounded-md py-2 sm:py-3 text-xl sm:text-2xl font-medium hover:bg-green-700 transition-all shadow-lg"
                        onClick={signout}
                    >
                        Signout
                    </button>
                    <button 
                        className="flex-1 itim bg-gray-600 text-white rounded-md py-2 sm:py-3 text-xl sm:text-2xl font-medium hover:bg-gray-700 transition-all shadow-lg"
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
