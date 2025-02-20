"use client"

import Toolbar from '@/components/scrapper/Toolbar';
import react, { useEffect, useState } from 'react';
import 'simplebar/dist/simplebar.min.css';
import RHeader from '@/components/scrapper/RHeader';
import ButtonsR from '@/components/reddithome/ButtonsR';
import InterestTables from '@/components/reddithome/InterestTables';
import { BsSave2 } from "react-icons/bs";

import interests from '../../interests.json'
import Popup from '@/components/Search/Popup';
import PopupR from '@/components/Search/PopupR';



export default function Scrapper() {
  const [name, setName] = useState(null);
  const [timeRange, setTimeRange] = useState("7d");
  const [dateRange, setDateRange] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
      setShowPopup(false);
    };

    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet([], {
          header: ["subreddit", "username", "icon_url", "created_utc", "title", "score", "num_comments"],
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
  
      XLSX.writeFile(wb, "exported_data.xlsx");
    };
  
    const handleExport = (type) => {
      console.log(`Export type: ${type}`);
      exportToExcel()
      handlePopupClose();
    };

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  

  console.log(interests)


  return (
    <main className="flex-col h-screen	w-screen bg-white hide-scrollbar::-webkit-scrollbar ">

        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <RHeader />
        
        {/* Buttons */}
        <div className='flex mt-12  items-center justify-center' ><ButtonsR togglePopup ={togglePopup} /></div>
      

        {/* Pop Council Tables*/}
        <div className='flex text-black w-full '>
          <div className='flex w-1/6'></div>
       <div className='flex w-4/6 flex-col'>  
       
       <div className='text-blue-900 text-4xl flex'><div className='mr-4'><BsSave2 /></div>
       Tracked Interests</div>
       <hr className="my-4 border-t-2 border-blue-950 rounded-full" />

        <InterestTables categories ={interests}/>
        <PopupR show={showPopup} onClose={handlePopupClose} onExport={handleExport}/>

        </div>
          <div className='flex w-1/6'></div>
        </div>
        
    </main>
  )
}
