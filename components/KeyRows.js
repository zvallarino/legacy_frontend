import React from 'react'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import LineChart from './LineChart';
import LineChartForMetric from './LineChartForMetric';


function KeyRows({singledata}) {
    function isPositive(number) {
        return number > 0;
    }

  return (
    <div className='flex '>
        <div>{singledata.metric}</div>
        <div>{singledata.last} </div>
        <div>{singledata.prev}</div>
        {/* <div>{(singledata.last-singledata.prev)/singledata.prev}</div> */}
        <div>{isPositive((singledata.last-singledata.prev)/singledata.prev)?<AiFillCaretUp />:<AiFillCaretDown />}</div>
        <div><LineChartForMetric /></div>
    </div>
  
  )
}

export default KeyRows