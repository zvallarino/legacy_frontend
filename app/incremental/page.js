"use client"



import PostSearch from '@/components/general/PostSearch';
import IncPostSub from '@/components/incremental/IncPostSub';
import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import XHeader from '@/components/scrapper/XHeader';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Scrapper() {
  const [show, setShow] = useState(true); // This state seems unused currently
    const [time, setTime] = useState("all");
 
    const timeOptions = [
      { label: "Today", value: "day" },
      { label: "This Hour", value: "hour" },
      { label: "This Week", value: "week" },
      { label: "This Month", value: "month" },
      { label: "This Year", value: "year" },
      { label: "All", value: "all" },
    ];
 
 
    const [typeList, setTypeList] = useState("top");
 
    const listOptions = [
      { label: "Top", value: "top" },
      { label: "Best", value: "best" },
      { label: "Hot", value: "hot" },
      { label: "New", value: "new" },
      { label: "Rising", value: "rising" },
    ];
 
    // --- Start: Added screenType logic ---
    const [screenType, setScreenType] = useState('laptop'); // Default state
 
    useEffect(() => {
      const handleResize = () => {
        // Using the same breakpoint (1424px) - adjust if needed
        setScreenType(window.innerWidth >= 1424 ? 'desktop' : 'laptop');
      };
 
      // Set initial screen type on mount
      handleResize();
 
      // Add event listener for resize
      window.addEventListener('resize', handleResize);
 
      // Cleanup listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array for mount/unmount execution
    // --- End: Added screenType logic ---

  return (
    <main className="w-full bg-white">

        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <XHeader screenType={screenType} />
        
        {/* Buttons */}
        <ButtonsGeneral  screenType={screenType}  />

      
    {/* Timeframe selection divs */}
    <div className="flex justify-center gap-4 my-4">
            {timeOptions.map((option) => (
            <div
                key={option.value}
                onClick={() => setTime(option.value)}
                className={`cursor-pointer px-4 py-2 border rounded ${
                time === option.value ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
            >
                {option.label}
            </div>
            ))}
        </div>

      <div className='flex justify-center gap-4 my-4'>
          {listOptions.map((option) => (
              <div
                  key={option.value}
                  onClick={() => setTypeList(option.value)}
                  className={`cursor-pointer px-4 py-2 border rounded ${
                  typeList === option.value ? "bg-blue-500 text-white" : "bg-white text-black"
                  }`}
              >
                  {option.label}
              </div>
              ))}
  
      </div>
        
        {/* Pop Council Tables */}
        <div className="text-black ">
            <IncPostSub time={time} typeList ={typeList} />
        </div>
      
        
    </main>
  )
}
