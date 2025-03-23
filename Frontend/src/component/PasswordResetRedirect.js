import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const PasswordResetRedirect = () => {
    const { resetToken } = useParams(); // Extract the resetToken from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Open the password reset page in a new tab with restricted features
        const resetUrl = `/reset-password/${resetToken}`; // Actual password reset page
        window.open(resetUrl, '_blank', 'toolbar=0,location=0,menubar=0,width=800,height=600');

        // Redirect the current tab back to the home page or a safe location
        navigate('/');
    }, [resetToken, navigate]);

    return null; // This component only handles the redirect, so no UI is needed
};

export default PasswordResetRedirect;
