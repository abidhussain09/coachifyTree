import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null, // Store user's email
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload; // Update the email in the state
        },
        clearEmail: (state) => {
            state.email = null; // Clear the email (e.g., after logout)
        },
    },
});

export const { setEmail, clearEmail } = userSlice.actions; // Export actions
export default userSlice.reducer; // Export the reducer