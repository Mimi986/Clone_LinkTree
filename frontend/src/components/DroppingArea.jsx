import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const DroppingArea = ({onDrop}) => {
    const [showDrop, setshowDrop] = useState(false)
  return (
    <motion.section onDragEnter={()=>setshowDrop(true)} onDragLeave={()=>setshowDrop(false)} 
    onDrop={()=>{onDrop()
        setshowDrop(false)
    }}
    onDragOver={e => e.preventDefault()}
    className='w-full border border-dashed border-[#140606] rounded-3xl p-1' animate={{opacity: showDrop? 1 : 0}} transition={{duration:0.2}}>
        </motion.section>
  )
}

export default DroppingArea