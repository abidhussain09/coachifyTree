import { createSlice } from '@reduxjs/toolkit';
import { isTokenValid } from '../utils/auth';

const booleanSlice = createSlice({
    name: 'booleanValue',
    initialState: isTokenValid(),
    reducers: {
        toggle: (state) => !state,
        setValue: (state, action) => action.payload,
    },
});

export const { toggle, setValue } = booleanSlice.actions;
export default booleanSlice.reducer;