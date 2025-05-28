import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Trash2, MoreVertical } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url;

export const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const [role, setRole] = useState(null); // Store user role

  async function getNotices() {
    try {
      const data = await axios.get('/notices/');
      setNotices(data.data);
    } catch (error) {
      console.log("Error in fetching the notices", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        console.error("No token found, authentication required!");
        return;
      }
      await axios.post('/notices/deleteNotice', { _id: id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Notice deleted successfully");
      getNotices();
    } catch (error) {
      console.log("Error deleting notice", error);
    }
  };

  // Close menu on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // On mount: fetch notices and extract user role
  useEffect(() => {
    getNotices();

    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        setRole(payload.role); // Expecting token to include a 'role' field
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  return (
    <div className='flex flex-wrap items-center justify-center gap-4 p-2 overflow-y-auto max-h-[720px]'>
      {notices.map((notice, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center  
                    px-4 py-6 
                    w-full max-w-[280px] 
                    h-auto min-h-[350px] 
                    rounded-[20px] bg-neutral-800 text-white 
                    border-2 border-transparent 
                    hover:border-[#63a73a] hover:bg-neutral-900"
        >
          {/* Show 3-dot delete menu only if not student */}
          {role !== 'Student' && (
            <div className="absolute top-2 right-2" ref={menuRef}>
              <button
                onClick={() => setOpenMenuId(openMenuId === notice._id ? null : notice._id)}
                className="text-white hover:text-gray-300"
              >
                <MoreVertical size={20} />
              </button>

              {openMenuId === notice._id && (
                <div className="absolute top-6 right-0 bg-neutral-700 border border-gray-600 rounded shadow-md z-10">
                  <button
                    className="flex items-center gap-2 px-3 py-1 text-red-400 hover:text-red-600"
                    onClick={() => handleDelete(notice._id)}
                  >
                    <Trash2 size={18} /> <p className='text-base'>Delete</p>
                  </button>
                </div>
              )}
            </div>
          )}

          <div className='flex flex-col basis-5/6 gap-4'>
            <h3 className="text-xl sm:text-2xl border-b-2 border-white break-words text-center">
              {notice.title}
            </h3>
            <p className="text-base sm:text-lg break-words text-center text-wrap">
              {notice.content}
            </p>
          </div>
          <p className='text-base basis-1/6 sm:text-lg break-words text-center text-slate-400'>
            Published On: {new Date(notice.updatedAt).toISOString().split("T")[0]}
          </p>
        </div>
      ))}
      <ToastContainer className="text-base" />
    </div>
  );
};
