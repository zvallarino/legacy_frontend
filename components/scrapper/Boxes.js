import React from 'react'
import socialmedia from "../../socialmedia.json";
import Box from './Box'
import { TbCards } from "react-icons/tb";


function Boxes() {
    const allsocial = socialmedia.map((social, index) => (
      <Box key={index} social={social} />
    ));
  
    return <div className='flex  mt-20 '>
            <div className="flex w-1/6"></div>

      <div className='flex w-4/6 flex-col  justify-evenly '>
      <div className='flex'>
        <TbCards  className='flex ml-2 text-4xl font-bold text-blue-900'/>
        <div className='flex ml-2 text-4xl font-bold text-blue-900'>Cards</div>
        
        </div>
        <hr className="my-4 border-t-2 border-blue-950 rounded-full" />

      <div className='grid grid-cols-3 justify-center'>{allsocial}</div></div>
      <div className="flex w-1/6"></div>

      </div>  }
  
  export default Boxes;


  // <div className='flex'> <div className='grid grid-cols-6 border-4 border-red-700 justify-center'>{allsocial}</div>;</div>