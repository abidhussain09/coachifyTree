import { configureStore } from '@reduxjs/toolkit';
import booleanSlice from './booleanSlice';

export const store = configureStore({
    reducer: {
        booleanValue: booleanSlice,
    },
});