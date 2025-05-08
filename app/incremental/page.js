"use client"



import PostSearch from '@/components/general/PostSearch';
import IncrementalSubredditSearch from '@/components/incremental/IncPostSub';
import IncPostSub from '@/components/incremental/IncPostSub';
import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import XHeader from '@/components/scrapper/XHeader';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Scrapper() {
    const [time, setTime] = useState("all");
    const [typeList, setTypeList] = useState("top");
    const [screenType, setScreenType] = useState('laptop'); // Or your default

    const timeOptions = [/* ... */]; // Keep your options
    const listOptions = [/* ... */]; // Keep your options

     useEffect(() => { /* ... existing resize logic ... */ }, []);

     return (
        <main className="w-full bg-white min-h-screen"> {/* Added min-h-screen */}

            {/* Toolbar */}
            <Toolbar />

            {/* Disclaimer */}
            <XHeader screenType={screenType} />

             {/* Optional: Buttons */}
             {/* <ButtonsGeneral screenType={screenType} /> */}

            {/* Timeframe and List Type Selections */}
             <div className="flex justify-center gap-2 md:gap-4 my-4 px-2 flex-wrap"> {/* Added flex-wrap */}
                 {timeOptions.map((option) => (
                     <button // Changed div to button for better accessibility
                         key={option.value}
                         onClick={() => setTime(option.value)}
                         className={`cursor-pointer px-3 py-1 md:px-4 md:py-2 border rounded text-sm md:text-base ${
                             time === option.value ? "bg-blue-500 text-white border-blue-500" : "bg-white text-black border-gray-300 hover:border-blue-400"
                         }`}
                         aria-pressed={time === option.value} // Accessibility
                     >
                         {option.label}
                     </button>
                 ))}
             </div>

             <div className='flex justify-center gap-2 md:gap-4 my-4 px-2 flex-wrap'> {/* Added flex-wrap */}
                 {listOptions.map((option) => (
                     <button // Changed div to button
                         key={option.value}
                         onClick={() => setTypeList(option.value)}
                          className={`cursor-pointer px-3 py-1 md:px-4 md:py-2 border rounded text-sm md:text-base ${
                             typeList === option.value ? "bg-blue-500 text-white border-blue-500" : "bg-white text-black border-gray-300 hover:border-blue-400"
                         }`}
                         aria-pressed={typeList === option.value} // Accessibility
                     >
                         {option.label}
                     </button>
                 ))}
             </div>

            {/* Pass time and typeList to the search component */}
            <div className="text-black mt-6"> {/* Added margin-top */}
                 {/* Render the search component directly */}
                <IncrementalSubredditSearch time={time} typeList={typeList} />
                 {/* IncPostSub might not be needed if Search handles everything */}
                 {/* <IncPostSub time={time} typeList={typeList} /> */}
            </div>

        </main>
    )
}