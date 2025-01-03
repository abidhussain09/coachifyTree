import jwtDecode from 'jwt-decode';

export const isTokenValid = () => {
    const token = localStorage.getItem('Token');
    if (!token) return false; // No token means the user is not authenticated

    try {
        const { exp } = jwtDecode(token); // Decode the token to extract expiration time
        if (Date.now() >= exp * 1000) { // Check if the token has expired
            localStorage.removeItem('Token'); // Remove expired token
            return false;
        }
        return true; // Token is valid
    } catch (error) {
        console.error('Invalid Token:', error);
        return false; // Token is invalid
    }
};
