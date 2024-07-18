import { createSlice } from '@reduxjs/toolkit';

const booleanSlice = createSlice({
    name: 'booleanValue',
    initialState: true,
    reducers: {
        toggle: (state) => !state,
        setValue: (state, action) => action.payload,
    },
});

export const { toggle, setValue } = booleanSlice.actions;
export default booleanSlice.reducer;