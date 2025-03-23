import { configureStore } from '@reduxjs/toolkit';
import booleanSlice from './booleanSlice';
import  userReducer  from './userSlice';

export const store = configureStore({
    reducer: {
        booleanValue: booleanSlice,
        user:userReducer,
    },
});