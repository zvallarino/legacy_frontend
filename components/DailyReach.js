import React from 'react'
import TwoLineChart from './TwoLineChart'

function DailyReach() {
  return (
    <div className='mt-6'>
      <div className='text-black text-xl font-bold mb-4 '>Daily Reach (90 days)</div>
      <TwoLineChart />
    </div>
  )
}

export default DailyReach