import React from 'react'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = "http://localhost:3000/api/auth"

export const signup = createAsyncThunk("users/signup",
    async({name,email,password,bio},{rejectWithValue})=>{
        try{
        const response = await fetch(`${baseUrl}/signup`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,email,password,bio})        })

        const data = await response.json()

        if(!response.ok){
            return rejectWithValue(data.message || "error while signing up")
        }
        return data}
        
        catch(error){
            console.error(error)
        }
        
    }
)

export const signin = createAsyncThunk("users/signin",
    async({email,password},{rejectWithValue})=>{
        try {
            const response = await fetch(`${baseUrl}/signin`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password}),
                credentials:"include"
            })
            const data = await response.json()
            if(!response.ok){
                return rejectWithValue(data.message || "error while signing in")
            }
            return data 
        } catch (error) {
             console.error(error)
        }
    }
)

export const logout = createAsyncThunk("users/logout",
    async()=>{
        const response = await fetch(`${baseUrl}/logout`,{
            method:"GET",
            headers:{"Content-Type":"application/json"}}
        )
        const data = await response.json()
    }
)

export const checkAuth = createAsyncThunk("users/checkAuth",
    async()=>{
        const response = await fetch (`${baseUrl}/check-auth`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        const data = await response.json()
    }
)


const userSlice = createSlice({
    name:"users",
    initialState:{
        user:null,
        isAuthenticated:false,
        error:null,
        isLoading:false,
        isCheckignAuth:false,
        message:null
    },
    reducers:{},

    extraReducers:(builder) => {
        builder
        .addCase(signup.fulfilled,(state,action)=>{
            state.isAuthenticated=true 
            state.isLoading=false
           state.user = action.payload.admin
           state.error=null
        })

         .addCase(signup.pending,(state,action)=>{
            state.isLoading=true
             state.error = null
        })

         .addCase(signup.rejected,(state,action)=>{
            state.isLoading=false
            state.error = action.payload
            state.isAuthenticated=false
        })

         .addCase(signin.fulfilled,(state,action)=>{
            state.isLoading=false 
            state.isAuthenticated=true
            state.user = action.payload.admin
            state.error=null
        })

         .addCase(signin.pending,(state,action)=>{
            state.isLoading=true
            state.error=null
        })

         .addCase(signin.rejected,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.error = action.payload
        })

         .addCase(logout.fulfilled,(state)=>{
            state.user=null
            state.isLoading=false
            state.error=null
            state.isAuthenticated=false 
        })

        .addCase(checkAuth.fulfilled,(state)=>{
             state.user=action.payload.user
             state.isCheckignAuth=false
             state.error=null
             state.isAuthenticated=true
         })

         .addCase(checkAuth.pending,(state)=>{
             state.isCheckignAuth=true
             state.error=null
         })

         .addCase(checkAuth.rejected,(state)=>{
             state.isCheckignAuth=false
             state.error=null
             state.isAuthenticated=false 
         })
    }
})


export default userSlice.reducer 