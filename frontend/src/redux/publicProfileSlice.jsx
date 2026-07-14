import React from 'react'
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

export const getUserWithLinks = createAsyncThunk("links/getUserWithLinks",
    async(_,{rejectWithValue})=>{
    try{
        const response = await fetch(`http://localhost:3000/api/public/get-user-with-links`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify()
        })
        const data = await response.json()
        if(!response.ok){
            console.log("error in fetching the users")
        }
        return data }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    }
)

const publicProfileSlice = createSlice({
    name:"publicProfile",
    initialState:{
    usersWithLinks:[],
    isLoading:false,
    error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUserWithLinks.fulfilled,(state,action)=>{
            state.status="Fulfilled"
            state.isLoading=false
            state.usersWithLinks=action.payload.usersWithLinks
            state.error=null
         })

         .addCase(getUserWithLinks.pending,(state,action)=>{
            state.status="Pending"
            state.isLoading=true
            state.error=null
         })

        .addCase(getUserWithLinks.rejected,(state,action)=>{
            state.status="Failed"
            state.isLoading=false
            state.usersWithLinks=[]
            state.error=action.payload 
         })     
    }
})

export default publicProfileSlice.reducer
