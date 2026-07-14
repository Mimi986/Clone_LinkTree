import React from 'react'
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

export const getUserLinksPublic = createAsyncThunk("links/getUserLinksPublic",
    async(name,{rejectWithValue})=>{
    try{
        const response = await fetch(`http://localhost:3000/api/public/get-user-links-public/${name}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
        })
        const data = await response.json()
        if(!response.ok){
            return ("error in fetching the user or the links")
        }
        return data }
    catch (error) {
      return rejectWithValue(error.message);
    }
    }
)

const publicProfileSlice = createSlice({
    name:"publicProfile",
    initialState:{
    user:null,
    links:[],
    isLoading:false,
    error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUserLinksPublic.fulfilled,(state,action)=>{
            state.status="Fulfilled"
            state.isLoading=false
            state.user=action.payload.user
            state.links=action.payload.links
            state.error=null
         })

         .addCase(getUserLinksPublic.pending,(state,action)=>{
            state.status="Pending"
            state.isLoading=true
            state.error=null
         })

        .addCase(getUserLinksPublic.rejected,(state,action)=>{
            state.status="Failed"
            state.isLoading=false
            state.user=null
            state.links=[]
            state.error=action.payload 
         })     
    }
})

export default publicProfileSlice.reducer
