import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggle, setValue } from '../store/booleanSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signout = () => {
    const booleanValue = useSelector((state) => state.booleanValue);
    const dispatch = useDispatch();
    const siningout=()=>{
        dispatch(setValue(true));
        toast.success("Signout in successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
        goBack();
    }
    const goBack = () => {
        // Use history.goBack() if you're using React Router v5
        // Use navigate(-1) if you're using React Router v6 with a useNavigate hook
        // For simplicity, window.history.back() is used here
        window.history.back();
      };
    return (
        <div className='flex items-center justify-center my-[100px] mx-auto itim rounded-[20px] border-white border-2 p-6'>
            <div className='w-[628px] h-[300px] flex flex-col gap-8 items-center justify-center'>
                <h1 className='text-3xl'>Are you sure to Signout?</h1>
                <div className='flex justify-around gap-4'>
                <button className='bg-[#5a843f] rounded-[20px] h-[70px] w-[150px] text-2xl' onClick={siningout}>Signout</button>
                <button className='bg-[#63a73a] rounded-[20px] h-[70px] w-[150px] text-2xl' onClick={goBack}>StaySignin</button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}
