import UsersReducer from './userSlice'
import LinksReducer from './linkSlice'
import PublicProfileReducer from './publicProfileSlice'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        users:UsersReducer,
        links:LinksReducer,
        publicProfile:PublicProfileReducer
    },
})
