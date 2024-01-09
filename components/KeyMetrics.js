"use client"
import React, {useState} from 'react'
import KeyMetric from "../KeyMetric.json";
import KeyRows from './KeyRows';
import LineChartForMetric from './LineChartForMetric';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';



function KeyMetrics() {

  const [data, setData] = useState(KeyMetric)
  const headers = ['Metric', "Last 30 Days", "Prev 30 Days", "+/-","Graph"] 

  const rowHeight = '50px'; // Example height

  function isPositive(number) {
    return number > 0;
}

  return (
    <div className='h-full w-full bg-neutral-100'>
      <div className='text-black text-2xl font-bold bg-neutral-100'><div className='my-6 p-4 rounded-md shadow-md bg-white border-2 mr-2'>Key Metrics(Over the last 30 days)</div></div>
   
        <div className='text-black border-2 bg-white p-2 my-10 mr-2 rounded-md shadow-md'>
        <div className="flex ml-2">
          {headers.map((header, index) => (
        <div className={`flex-1 ${header === '+/-' ? 'flex-grow' : 'mr-2'}`} key={index}>
              <div className="font-bold " style={{ minHeight: rowHeight }}>{header}</div>
              {data.map(metricData => (
                <div 
                  className="flex items-center" // This ensures vertical centering of content
                  style={{ minHeight: rowHeight }} // Ensures each row has at least `rowHeight` height
                  key={`${metricData.metric}-${index}`}
                >
                  {index === 0 && metricData.metric}
                  {index === 1 && metricData.last.toLocaleString()}
                  {index === 2 && metricData.prev.toLocaleString()}
                  {
      index === 3 && (
        isPositive(Math.round(((metricData.last - metricData.prev) / metricData.prev) * 100)) ? 
          <AiFillCaretUp style={{ color: 'green' }} /> : 
          <AiFillCaretDown style={{ color: 'red' }} />
      )
    }
                  {index === 4 && (
                <div className="flex-grow" style={{ height: rowHeight, overflow: 'hidden' }}> {/* Graph stretches horizontally */}
                      <LineChartForMetric />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
    
      </div>
    </div>
  )
}

export default KeyMetrics