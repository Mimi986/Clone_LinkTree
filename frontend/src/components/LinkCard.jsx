import React from 'react'
import { ToggleRight,ToggleLeft,Trash2,PencilLine,Globe,GripVertical} from 'lucide-react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {deleteLink,activateLink,deactivateLink} from '../redux/linkSlice'
import { GripVerticalIcon } from 'lucide-react'

const LinkCard = ({link,onDelete,onToggle,onEdit,index,setactiveCard}) => {
  
return (
    <div className='flex flex-col gap-3 w-full ml-2 hover:cursor-grab' draggable 
    onDragStart={()=>setactiveCard(index)} onDragEnd={()=>setactiveCard(null)}>
    <div className='flex w-full gap-2 items-center justify-between py-4 -mx-4'>
      <GripVertical className='text-gray-800 hover:text-gray-600'/>
      <div className='flex flex-col flex-1 min-w-0'>
        <h1 className={link.active ? 'text-white text-[23px] font-semibold' : 'text-gray-500'}>{link.title}</h1>
        <a href={link.dest} className='text-[14px] text-gray-500 font-serif'>{link.dest}</a>
      </div> 
      <div className='mb-3.25'>
        <button onClick={()=>onToggle(link._id)} className='hover:cursor-pointer rounded-full hover:bg-gray-800'>{link.active ? <ToggleRight className='text-green-600 mr-2' size={25} strokeWidth={3}/> : <ToggleLeft className='text-gray-500' size={25}/>}</button>
        <button onClick={()=>onEdit(link)} className='hover:cursor-pointer rounded-full hover:bg-gray-700'><PencilLine className='text-gray-400 hover:text-gray-500 mr-2' size={22}/></button>
        <button onClick={()=>onDelete(link._id)} className='hover:cursor-pointer rounded-full hover:bg-gray-700'><Trash2 className='text-gray-400 hover:text-red-400' size={22}/></button>
      </div>   
      </div>
    </div>
  )
}

export default LinkCard