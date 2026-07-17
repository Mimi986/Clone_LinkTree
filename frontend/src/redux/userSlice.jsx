import React from 'react'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = "http://localhost:3000/api/auth"

export const signup = createAsyncThunk("users/signup",
    async({name,email,password,bio,photo},{rejectWithValue})=>{
        try{
            const formData = new FormData()
            formData.append("name",name)
            formData.append("email",email)
            formData.append("password",password)
            formData.append("bio",bio)

            if(photo){
                formData.append("photo",photo)
            }
        const response = await fetch(`${baseUrl}/signup`,{
            method:"POST",
            body:formData,  //le navigateur va encoder automatiquement tout ça avec multipart/form-data
            credentials:"include"
            })

        const data = await response.json()
        if(!response.ok){
            return rejectWithValue(data);
        }
        return data}
        
        catch(error){
            return rejectWithValue({ msg: error.message });
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
                return rejectWithValue(data);
            }
            return data 
        } catch (error) {
              return rejectWithValue({ msg: "error" });
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

export const forgotPassword = createAsyncThunk("users/forgotPassword",
    async(email,{rejectWithValue})=>{
       try{ const response = await fetch(`${baseUrl}/forgot-password`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({email}),
            credentials:"include"
        }
        )
        const data = await response.json()
        if(!response.ok) return rejectWithValue(data)
        return data 
    }
        catch(error){
            return rejectWithValue({msg:error.msg})
        }
    }
)

export const resetPassword = createAsyncThunk("users/resetPassword",
    async({token,password},{rejectWithValue})=>{
       try{ const response = await fetch(`${baseUrl}/reset-password/${token}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({password}),
            credentials:"include"
        }
        )
        const data = await response.json()
        return data 
    }
        catch(error){
            return rejectWithValue({msg:error.message})
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
            credentials:"include",
        })
        const data = await response.json()
        if(!response.ok){
            return rejectWithValue("failed to fetch infos")
        }
        return data 
    }catch(error){
        return rejectWithValue({msg: error})
    }}
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
            state.error = action.payload.msg
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
            state.error = action.payload.msg
        })

         .addCase(logout.fulfilled,(state)=>{
            state.user=null
            state.isLoading=false
            state.error=null
            state.isAuthenticated=false 
        })

        .addCase(forgotPassword.fulfilled,(state,action)=>{
            state.isLoading=false 
            state.error=null
        })

         .addCase(forgotPassword.pending,(state,action)=>{
            state.isLoading=true
            state.error=null
        })

         .addCase(forgotPassword.rejected,(state,action)=>{
            state.isLoading=false
            state.error = action.payload.msg
        })

        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.isLoading=false 
            state.error=null
        })

         .addCase(resetPassword.pending,(state,action)=>{
            state.isLoading=true
            state.error=null
        })

         .addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading=false
            state.error = action.payload.msg
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
            state.error=action.payload.msg
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
            state.error=action.payload.msg
         })         
    
    }
})


export default userSlice.reducer 