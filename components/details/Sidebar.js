import React from 'react'
import Dropdown from '../Dropdown'
import DropdownDetails from './DropDownDetails'

function Sidebar({ currentName, timeRange, setTimeRange, onExportClick }) {
    return (
    <div className='flex flex-col justify-center items-center text-black mr-20'>
      <div className='flex flex-col bg-white shadow-md justify-center items-start p-4 rounded-lg '>
    <div className='text-xl mb-2'>Current Subreddit: {currentName}</div>
    <div className='flex w-full justify-center text-xl my-2'>
      <hr style={{ height: '1px', backgroundColor: 'black', width: '100%', border: '1px dotted black' }} />
    </div> 
    <div className='text-lg mt-2'>Number of Subscribers: 100</div>
    <div className='text-lg mt-2'>Number of Posts: 100</div>
    <div className='text-lg mt-2'>Currently Online</div>
    <div className="mt-2"><DropdownDetails timeRange={timeRange} setTimeRange={setTimeRange}/></div>
    <div className='flex w-full justify-center  mt-2'>
        <a onClick={onExportClick} class="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
            <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span class="relative">Export</span>
        </a></div>
         <div className='flex w-full justify-center  mt-2'>
                <a href="http://localhost:3000/Scrapper" class="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
        <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span class="relative">Go Back</span>
        </a></div>
         

     
      </div>
    </div>
  );
}


export default Sidebar;

