import React from 'react'
import Followers from './Followers'
import GotoDjango from './GotoDjango'
import Spaceholder from './Spaceholder'
import Engaged from './Engaged'
import KeyMetrics from './KeyMetrics'
import DailyReach from './DailyReach'
import Awareness from './Awareness'

function Mainpage() {

  return (
   <div className='flex w-full h-full  '>
      <div className='flex w-1/6 '> cats</div>
    <div className='flex w-4/6 flex-col mt-40 '>
    
        <div className="flex h-1/2 w-full  ">
          <div className='w-1/3 md:border-dotted border-2 border-grey-200'><Followers /></div>
          <div  className='w-1/3 md:border-dotted	 border-2 border-grey-200'> <Engaged /></div>
          <div className='w-1/3  md:border-dotted	border-2 border-grey-200'><KeyMetrics /></div>
        </div>
        <div className="flex h-1/2 w-full  ">
          <div className='w-1/3 md:border-dotted	border-2 border-grey-200'> <DailyReach /></div>
          <div className='w-1/2 md:border-dotted	border-2 border-grey-200'> <Awareness /></div>
         <div className='w-1/6 md:border-dotted	border-2 border-grey-200'>  <GotoDjango /></div>
        </div>
    </div>
    <div className='flex w-1/6 '> cats</div>
   </div>
  )
}

export default Mainpage