import React from 'react'
import Followers from './Followers'
import GotoDjango from './GotoDjango'
import Spaceholder from './Spaceholder'
import Engaged from './Engaged'
import KeyMetrics from './KeyMetrics'
import DailyReach from './DailyReach'
import Growth from './Growth'

function Mainpage() {

  return (
   <div className='flex-col w-full h-full  '>
      <div className="flex h-1/2 w-full bg-white ">
        <div className='w-1/3 border-2 border-orange-500'><Followers /></div>
        <div  className='w-1/3 border-2 border-orange-500'> <Engaged /></div>
        <div className='w-1/3 border-2 border-orange-500'><KeyMetrics /></div>
      </div>
      <div className="flex h-1/2 w-full bg-white ">
        <div className='w-1/3 border-2 border-orange-500'> <DailyReach /></div>
        <div className='w-1/2 border-2 border-orange-500'> <Growth /></div>
       <div className='w-1/6 border-2 border-orange-500'>  <GotoDjango /></div>
      </div>
   </div>
  )
}

export default Mainpage