"use client"

import Toolbar from '@/components/scrapper/Toolbar';
// Corrected import for useState and useEffect
import { useEffect, useState } from 'react';
import 'simplebar/dist/simplebar.min.css';
import RHeader from '@/components/scrapper/RHeader';
import ButtonsR from '@/components/reddithome/ButtonsR';
import InterestTables from '@/components/reddithome/InterestTables';
import { BsSave2 } from "react-icons/bs";

// Assuming interests.json and Popups are correctly set up
import interests from '../../interests.json'
import Popup from '@/components/Search/Popup'; // Assuming you might need this later?
import PopupR from '@/components/Search/PopupR';

// Assuming XLSX is imported if used directly client-side, or handled via API
// import * as XLSX from 'xlsx'; // Uncomment and install if using client-side export directly

export default function Scrapper() {
  const [name, setName] = useState(null);
  const [timeRange, setTimeRange] = useState("7d");
  const [dateRange, setDateRange] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // --- Start: Added screenType logic ---
  const [screenType, setScreenType] = useState('laptop'); // Default state

  useEffect(() => {
    const handleResize = () => {
      // Using the same breakpoint as your example (1424px)
      // Adjust this value if needed
      setScreenType(window.innerWidth >= 1424 ? 'desktop' : 'laptop');
    };

    // Set initial screen type on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs only once on mount and cleanup on unmount
 // --- End: Added screenType logic ---


  const handlePopupClose = () => {
      setShowPopup(false);
  };

  // Placeholder for export logic - Ensure XLSX is handled appropriately
  const exportToExcel = () => {
      console.warn("XLSX export function called. Ensure XLSX library is properly set up for client-side or use an API endpoint.");
      // Example structure - requires XLSX library
      /*
      const ws = XLSX.utils.json_to_sheet([], {
          header: ["subreddit", "username", "icon_url", "created_utc", "title", "score", "num_comments"],
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, "exported_data.xlsx");
      */
  };

  const handleExport = (type) => {
      console.log(`Export type: ${type}`);
      exportToExcel();
      handlePopupClose();
  };

  const togglePopup = () => {
      setShowPopup(!showPopup);
  };

  console.log(interests);

  return (
    // --- Modified className to use screenType ---
    // Applied conditional background color similar to Homepage example.
    // Adjust 'bg-green-100' and 'bg-red-100' (or other classes) as needed for Scrapper's design.
    <main className={`flex-col min-h-screen w-screen hide-scrollbar::-webkit-scrollbar ${screenType === 'laptop' ? '' : ''}`}>
      {/* toolbar */}
      <Toolbar />

      {/* disclaimer */}
      <RHeader screenType ={screenType} />

      {/* Buttons */}
      <div className={`flex ${screenType === 'laptop' ? ' mt-2' : 'mt-12'} items-center justify-center`}>
        <ButtonsR togglePopup={togglePopup} screenType={screenType} />
      </div>

      {/* Pop Council Tables*/}
      <div className='flex text-black w-full '>
        <div className='flex w-1/6'></div>
        <div className='flex w-4/6 flex-col'>

          <div className={`flex ${screenType === 'laptop' ? 'text-2xl items-center text-blue-900 justify-start' : 'items-center'}`}> {/* Added items-center */}
            <div className={` ${screenType === 'laptop' ? '' : 'mr-4 text-xs'} `}><BsSave2 /></div>
            <div>Tracked Interests</div>
          </div>
          <hr className="my-4 border-t-2 border-blue-950 rounded-full" />

          <InterestTables categories={interests} screenType ={screenType}/>
          <PopupR show={showPopup} onClose={handlePopupClose} onExport={handleExport} />

        </div>
        <div className='flex w-1/6'></div>
      </div>

    </main>
  )
}

// RHead