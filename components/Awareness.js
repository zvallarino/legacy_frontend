import React from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

function Awareness() {

  function generateRandomNumber(min, max) {
    // Ensure the min and max are integers and min is less than max
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getLastSixMonths() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    
    const result = [];
    const date = new Date();
  
    for (let i = 0; i < 6; i++) {
      // Get last month date
      date.setMonth(date.getMonth() - 1);
      // Get the month name and prepend it to the result array
      result.unshift(monthNames[date.getMonth()]);
    }
  
    return result;
  }

  function createDataRow(header) {
    const minMax = {
      'Facebook Posts': [5, 40],
      'Instagram Posts': [1, 20],
      'X Posts': [2, 30],
      'Brand Mentions': [10, 100],
      'Brand Search': [10, 200]
    };
  
    // Generate random numbers for each category based on the specified range
    return Array.from({ length: 6 }, (_, index) => {
      return generateRandomNumber(...minMax[header]);
    });
  }

  const yheaders = ['Facebook Posts','Instagram Posts','X Posts','Brand Mentions','Brand Search'];
  const lastsixmonths = getLastSixMonths();

  // This function will be used to render the carets or empty cells where appropriate
  const renderChangeCaret = (current, previous) => {
    if (previous === null) return ''; // No caret for the first data point
    return current > previous ? <AiFillCaretUp className="text-green-500" /> : <AiFillCaretDown className="text-red-500" />;
  };

  return (
    <div className=' text-black w-full h-full p-2 '>
      <h1 className='text-black text-xl font-bold mb-8 bg-white p-4 my-2 rounded-md shadow-md '>Awareness (Last 6 Months)</h1>
      <table className="w-full text-left  rounded-md shadow-md text-center bg-white">
        <thead>
          <tr>
            <th className="px-2">Metric</th> {/* Add horizontal padding */}
            {lastsixmonths.map((month, index) => (
              <>
                <th key={month} className="px-2">{month}</th>
                {index < lastsixmonths.length - 1 && <th className="px-2">(+/-)</th>}
              </>
            ))}
            <th className="px-2">Annual Change %</th>
          </tr>
        </thead>
        <tbody>
        {yheaders.map((header, index) => {
    const dataRow = createDataRow(header);
    const annualChange = Math.round(((dataRow[dataRow.length - 1] - dataRow[0]) / dataRow[0]) * 100);
    const annualChangeClass = annualChange >= 0 ? 'text-green-500' : 'text-red-500';

    return (
      <tr key={header}>
        <td className="px-2">{header}</td>
        {dataRow.map((value, valueIndex) => {
          const elements = [
            <td key={`value-${valueIndex}`} className="px-2">{value}</td>
          ];
          if (valueIndex < dataRow.length - 1) {
            elements.push(
              <td key={`caret-${valueIndex}`} className="px-2">
                {renderChangeCaret(dataRow[valueIndex + 1], value)}
              </td>
            );
          }
          return elements;
        })}
        <td className={`px-2 ${annualChangeClass}`}>
          {annualChange}%
        </td>
      </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Awareness;