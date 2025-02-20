"use client"



import Toolbar from '@/components/scrapper/Toolbar';
import Header from '@/components/scrapper/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import AppContext from '@/context/AppContext';
import Sidebar from '@/components/details/Sidebar';
import Graph from '@/components/details/Graph';
import Posts from '@/components/details/Posts';
import Popup from '@/components/Search/Popup';
import * as XLSX from 'xlsx';
import DHeader from '@/components/scrapper/DHeader';
import { BsSave2 } from 'react-icons/bs';
import { GiMaterialsScience } from "react-icons/gi";
import { BsFillSignpostSplitFill } from "react-icons/bs";


export default function Scrapper() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const { currentName } = useContext(AppContext);
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

  console.log(currentName)

  return (
    <div className="flex flex-col h-screen w-screen  text-black">
    <Toolbar />
    <DHeader />
    <div className='flex w-full  mt-4'>
          <div className='flex w-1/6'></div>
          <div className='flex w-2/3 flex-col'>
  <div className='text-blue-900 text-4xl flex'>
    <div className='mr-4'><GiMaterialsScience /></div>
    Overview
  </div>
  <div className='w-full'>
    <hr className="my-4 border-t-2 border-blue-950 rounded-full" />
  </div>
</div>
          <div className='flex w-1/6'></div>
        </div>
    <div className="mt-2 flex-grow">
      <div className="flex flex-row justify-center bg-nuetral-100 ">
     
        <Sidebar timeRange={timeRange} setTimeRange={setTimeRange} currentName={currentName} onExportClick={togglePopup} />
          <Graph currentName ={currentName} />
  
      </div>
      <div className='flex justify-center'>
        </div>
        <div className='flex justify-center text-xl my-2'>
        </div>
        <div className='flex w-full '>
          <div className='flex w-1/6'></div>
          <div className='flex w-2/3 flex-col'>
  <div className='text-blue-900 text-4xl flex'>
    <div className='mr-4'><BsFillSignpostSplitFill  /></div>
    Posts
  </div>
  <div className='w-full'>
    <hr className="my-4 border-t-2 border-blue-950 rounded-full" />
  </div>
</div>
          <div className='flex w-1/6'></div>
        </div>
                   
      <Posts subreddit={currentName} />
    </div>
    <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport}/>
  </div>
  );
}