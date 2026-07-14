import React from 'react'
import { MousePointerClick,Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const LinkCardVisitor = ({link}) => {
  
  return (
    <motion.a className='flex bg-gray-400 rounded-2xl w-full hover:bg-gray-300 hover:cursor-pointer border border-gray-200
    py-4 px-40 mt-3 hover:shadow-xl' href={link.dest} target="_blank" rel="noopener noreferrer" whileHover={{scale:1.05}}>
        <div>
        <h1 className='font-semibold text-[19px]'>{link.title}</h1>
        {/* <MousePointerClick/> */}
        </div>
    </motion.a>
  )
}

export default LinkCardVisitor