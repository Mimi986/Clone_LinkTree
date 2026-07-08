import React from 'react'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = "http://localhost3000/auth"

export const signup = createAsyncThunk("users/signup",
    async()=>{
        const response = await fetch(`${baseUrl}/auth/signup`)
    }
)



const userSlice = createSlice({
    name:"users",
    initialState:{
        list:[],
        status:idle,
        error:null
    },
    reducers:{},

    extrareducers:(builder) => {

    }
})


export default userSlice