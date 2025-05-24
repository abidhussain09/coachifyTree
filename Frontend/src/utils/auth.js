import jwtDecode from 'jwt-decode';

export const isTokenValid = () => {
    const token = localStorage.getItem('Token');
    if (!token) return false; 

    try {
        const { exp } = jwtDecode(token); 
        if (Date.now() >= exp * 1000) { 
            localStorage.removeItem('Token'); 
            return false;
        }
        return true; 
    } catch (error) {
        console.error('Invalid Token:', error);
        return false; 
    }
};
