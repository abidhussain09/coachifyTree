import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggle, setValue } from '../store/booleanSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signout = () => {
    const booleanValue = useSelector((state) => state.booleanValue);
    const dispatch = useDispatch();
    const siningout = () => {
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
        }, 3000)
    }
    const goBack = () => {
        // Use history.goBack() if you're using React Router v5
        // Use navigate(-1) if you're using React Router v6 with a useNavigate hook
        // For simplicity, window.history.back() is used here
        window.history.back();
    };
    return (
        <div className='flex items-center justify-center my-[100px] mx-[300px] itim rounded-[20px] border-white border-2 p-6'>
            <div className='sm:w-[628px] sm:h-[300px] w-[300px] h-[400px] flex flex-col gap-8 items-center justify-center'>
                <h1 className='sm:text-3xl text-2xl'>Are you sure to Signout?</h1>
                <div className='flex justify-around gap-4'>
                    <button className='bg-[#63a73a] rounded-[20px] sm:h-[70px] sm:w-[150px] h-[50px] w-[120px] text-2xl hover:scale-105' onClick={siningout}>Signout</button>
                    <button className='bg-[#63a73a] rounded-[20px] sm:h-[70px] sm:w-[150px] h-[50px] w-[120px] text-2xl hover:scale-105' onClick={goBack}>StaySignin</button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}
