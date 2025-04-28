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
      <div className='flex w-1/6 '> </div>
    <div className='flex w-4/6 flex-col mt-40 '>
    
        <div className="flex h-1/2 w-full  ">
         <div className='w-1/6 md:border-dotted	border-2 border-grey-200'>  <GotoDjango /></div>
        </div>
    </div>
    <div className='flex w-1/6 '> </div>
   </div>
  )
}

export default Mainpage