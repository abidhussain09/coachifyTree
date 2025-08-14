import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const PasswordResetRedirect = () => {
    const { resetToken } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        
        const resetUrl = `/reset-password/${resetToken}`;
        window.open(resetUrl, '_blank', 'toolbar=0,location=0,menubar=0,width=800,height=600');

        navigate('/');
    }, [resetToken, navigate]);

    return null; 
};

export default PasswordResetRedirect;
