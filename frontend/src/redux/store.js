import UsersReducer from './userSlice'
import LinksReducer from './linkSlice'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        users:UsersReducer,
        links:LinksReducer
    },
})
