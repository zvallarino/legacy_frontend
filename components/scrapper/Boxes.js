import React from 'react'
import socialmedia from "../../socialmedia.json";
import Box from './Box'




function Boxes() {
    const allsocial = socialmedia.map((social, index) => (
      <Box key={index} social={social} />
    ));
  
    return <div className='mt-40 ml-10'><div className='grid grid-cols-6 justify-center'>{allsocial}</div></div>  }
  
  export default Boxes;


  // <div className='flex'> <div className='grid grid-cols-6 border-4 border-red-700 justify-center'>{allsocial}</div>;</div>