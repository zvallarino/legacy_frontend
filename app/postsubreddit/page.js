"use client"

import PostSearch from '@/components/general/PostSearch';
import PostSubSearch from '@/components/postsub/PostSubSearch';
import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import XHeader from '@/components/scrapper/XHeader';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Scrapper() {
  const [show, setShow] = useState(true);
  const [time, setTime] = useState("all");
  const [screenType, setScreenType] = useState('laptop');
  const [typeList, setTypeList] = useState("top");
  // Screen type detection
  useEffect(() => {
    const handleResize = () => {
      setScreenType(window.innerWidth >= 1424 ? 'desktop' : 'laptop');
    };
    
    // Set initial screen type
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const timeOptions = [
    { label: "Today", value: "day" },
    { label: "This Hour", value: "hour" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "This Year", value: "year" },
    { label: "All", value: "all" },
  ];

  const listOptions = [
    { label: "Top", value: "top" },
    { label: "Best", value: "best" },
    { label: "Hot", value: "hot" },
    { label: "New", value: "new" },
    { label: "Rising", value: "rising" },
  ];

  return (
    <main className={`flex-col min-h-screen w-screen ${screenType === 'laptop' ? '' : ''}`}>
        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <XHeader screenType={screenType} />
        
        {/* Buttons */}
        <ButtonsGeneral />

        {/* Timeframe selection divs */}
        <div className={`flex flex-wrap justify-center gap-2 lg:gap-4 my-3 lg:my-2 px-4 lg:px-0`}>
            {timeOptions.map((option) => (
            <div
                key={option.value}
                onClick={() => setTime(option.value)}
                className={`cursor-pointer px-2 lg:px-4 py-1 lg:py-2 text-sm lg:text-base border rounded ${
                time === option.value ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
            >
                {option.label}
            </div>
            ))}
        </div>

        <div className={`flex flex-wrap justify-center gap-2 lg:gap-4 my-3 lg:my-4 px-4 lg:px-0`}>
            {listOptions.map((option) => (
                <div
                    key={option.value}
                    onClick={() => setTypeList(option.value)}
                    className={`cursor-pointer px-2 lg:px-4 py-1 lg:py-2 text-sm lg:text-base border rounded ${
                    typeList === option.value ? "bg-blue-500 text-white" : "bg-white text-black"
                    }`}
                >
                    {option.label}
                </div>
            ))}
        </div>
        
        {/* Pop Council Tables */}
        <div className="text-black">
            <PostSubSearch time={time} typeList={typeList} screenType={screenType} />
        </div>
    </main>
  )
}

