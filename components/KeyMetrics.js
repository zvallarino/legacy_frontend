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
    <div className='text-black'>
    <div className="flex ml-2 mt-4">
      {headers.map((header, index) => (
    <div className={`flex-1 ${header === '+/-' ? 'flex-grow' : 'mr-2'}`} key={index}>
          <div className="font-bold mb-8" style={{ minHeight: rowHeight }}>{header}</div>
          {data.map(metricData => (
            <div 
              className="flex items-center" // This ensures vertical centering of content
              style={{ minHeight: rowHeight }} // Ensures each row has at least `rowHeight` height
              key={`${metricData.metric}-${index}`}
            >
              {index === 0 && metricData.metric}
              {index === 1 && metricData.last}
              {index === 2 && metricData.prev}
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
  )
}

export default KeyMetrics