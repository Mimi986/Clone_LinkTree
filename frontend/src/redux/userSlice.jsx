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
       try{ const response = await fetch(`${baseUrl}/logout`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        }
        )
        const data = await response.json()
        return data 
    }
        catch(error){
            console.error(error)
        }
    }
)

export const checkAuth = createAsyncThunk("users/checkAuth",
    async(_,{rejectWithValue})=>{
        const response = await fetch (`${baseUrl}/check-auth`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        const data = await response.json()
         if(!response.ok){
            return rejectWithValue(data)  
        }
        return data 
    }
)

export const editInfos = createAsyncThunk("links/editInfos",
    async({name,bio,photo},{rejectWithValue})=>{
       try{ const response = await fetch(`http://localhost:3000/api/admin/edit-infos`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify({name,bio,photo})
        })
        const data = await response.json()

        if(!response.ok){
            return rejectWithValue("failed to update infos")
        }
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }} 
)

export const getInfos = createAsyncThunk("links/get-infos",
    async(_,{rejectWithValue})=>{
        try{const response = await fetch(`http://localhost:3000/api/admin/get-infos`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        const data = await response.json()
        if(!response.ok){
            return rejectWithValue("failed to fetch infos")
        }
        return data 
    }catch(error){
        console.error(error)
    }}
)

export const getAllUsers = createAsyncThunk("users/getUsers",
    async()=>{
        const response = await fetch(`http://localhost:3000/api/admin/get-all-users`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify()
        })
        const data = await response.json()
        if(!response.ok){
            console.log("error in fetching the users")
        }
        return data 
    }
)

const userSlice = createSlice({
    name:"users",
    initialState:{
        user:null,
        isAuthenticated:false,
        error:null,
        isLoading:false,
        authChecked:false,
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

        .addCase(checkAuth.fulfilled,(state,action)=>{
             state.user=action.payload.user
             state.authChecked=true
             state.error=null
             state.isAuthenticated=true
         })

         .addCase(checkAuth.rejected,(state,action)=>{
             state.authChecked=true
             state.error=null
             state.isAuthenticated=false 
         })

         
        .addCase(editInfos.fulfilled,(state,action)=>{
            state.status = "Succeedded"
            state.isLoading=false
            const updated = action.payload.updatedInfosAdmin
            state.user = updated 
         })

         .addCase(editInfos.pending,(state,action)=>{
            state.status="Pending"
            state.isLoading=true
         })

         .addCase(editInfos.rejected,(state,action)=>{
            state.status="Failed"
            state.isLoading=false
            state.error=action.payload 
         })

         .addCase(getInfos.fulfilled,(state,action)=>{
            state.status="Fulfilled"
            state.isLoading=false
            state.user = action.payload.user
         })

         .addCase(getInfos.pending,(state,action)=>{
            state.status="Pending"
            state.isLoading=true
         })

        .addCase(getInfos.rejected,(state,action)=>{
            state.status="Failed"
            state.isLoading=false
            state.error=action.payload 
         })         

         .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.status="Fulfilled"
            state.isLoading=false
            state.list = action.payload.users
         })

         .addCase(getAllUsers.pending,(state,action)=>{
            state.status="Pending"
            state.isLoading=true
         })

        .addCase(getAllUsers.rejected,(state,action)=>{
            state.status="Failed"
            state.isLoading=false
            state.error=action.payload 
         })         
    }
})


export default userSlice.reducer 