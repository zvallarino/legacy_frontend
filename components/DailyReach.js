import React from 'react'
import TwoLineChart from './TwoLineChart'

function DailyReach() {
  return (
    <div className='p-4 bg-white'>
      <div className='text-black text-xl font-bold mb-4 bg-white p-4 rounded-md shadow-md '>Daily Reach (90 days)</div>
      <div className='p-2 rounded-md shadow-md bg-white'><TwoLineChart /></div>
    </div>
  )
}

export default DailyReach