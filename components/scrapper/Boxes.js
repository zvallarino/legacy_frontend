import React from 'react'
import socialmedia from "../../socialmedia.json";
import Box from './Box'




function Boxes() {
    const allsocial = socialmedia.map((social, index) => (
      <Box key={index} social={social} />
    ));
  
    return <div className='flex'>{allsocial}</div>;
  }
  
  export default Boxes;