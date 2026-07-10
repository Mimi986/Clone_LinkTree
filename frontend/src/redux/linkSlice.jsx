import React from 'react'
import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'

const baseUrl= "http://localhost:3000/api/admin"

export const getAllLinks = createAsyncThunk("links/getAllLinks",
    async()=>{
        const response = await fetch(`${baseUrl}/get-all-links`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        const data = await response.json()
        return data
    }
)

export const addLink = createAsyncThunk("links/addLink",
    async(link)=>{
        const response = await fetch (`${baseUrl}/add-link`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials: "include",
            body:JSON.stringify(link)
        })
        const data = await response.json()
        return data
    }
)

export const deleteLink = createAsyncThunk("links/deleteLink",
    async(id)=>{
        const response = await fetch(`${baseUrl}/delete-link/${id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        const data = await response.json()
        return data 
    }
)

export const editLink = createAsyncThunk("links/editLink",
    async(link)=>{
        const response = await fetch(`${baseUrl}/edit-link/${link.id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify(link)
        })
        const data = await response.json()
        return data 
    }
)

export const activateLink = createAsyncThunk("links/activateLink",
    async(link)=>{
        const response = await fetch(`${baseUrl}/activate-link/${link.id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify(link)
    })
        const data = await response.json()
        return data 
    }
)

export const deactivateLink = createAsyncThunk("links/deactivateLink",
    async(link)=>{
        const response = await fetch(`${baseUrl}/deactivate-link/${link.id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify(link)
    })
        const data = await response.json()
        return data 
    }
)

const linkSlice = createSlice({
    name:"links",
    initialState:{
        list:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extrareducers:(builder)=>{
        builder
        .addCase(getAllLinks.pending,(state,action)=>{
            state.status = "Loading"
        })
        .addCase(getAllLinks.fulfilled,(state,action)=>{
            state.status = "Succedded"
            state.list = action.payload.links
        })
        .addCase(getAllLinks.failed,(state,action)=>{
            state.status = "Failed"
            status.error = action.error.message
        })

        .addCase(editLink.fulfilled,(state,action)=>{
            state.status = "Succedded"
            const update = action.payload.updatedLink
            const index = state.list.map((link)=>link.id===update.id)
            if(index!==1){
            state.list[index] = update }
        })

        .addCase(addLink.fulfilled,(state,action)=>{
            state.status="Succedded"
            state.list.push(action.payload.link)
        })

        .addCase(deleteLink.fulfilled,(state,action)=>{
            state.status="Succedded"
            const deletedId = action.payload.id
            state.list = state.list.filter((link)=>link.id!==deletedId)
        })

        .addCase(deactivateLink.fulfilled,(state,action)=>{
            state.status="Succedded"
            const deactivate = action.payload.deactivatedLink
            const index = state.list.findIndex((link)=>deactivate.id===link.id)
            if(index!==-1){
                state.list[index].active = false 
            }
        })

        .addCase(activateLink.fulfilled,(state,action)=>{
            state.status = "Succedded"
            const activate = action.payload.activatedLink
            const index = state.list.findIndex((link)=>activate.id===link.id)
            if(index!==-1){
                state.list[index].active = true 
            }
        })
        
    }
})


export default linkSlice