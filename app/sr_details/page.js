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
    <div className="flex flex-col h-screen w-screen bg-neutral-100 text-black">
    <Toolbar />
    <Header />

    <div className="mt-2 flex-grow">
      <div className="flex flex-row justify-center bg-nuetral-100">
     
        <Sidebar timeRange={timeRange} setTimeRange={setTimeRange} currentName={currentName} onExportClick={togglePopup} />
          <Graph currentName ={currentName} />
  
      </div>
      <div className='flex justify-center'>
        <div className='text-black bg-white text-xl p-2 my-2 rounded-lg shadow-md'> List of Posts</div></div>
        <div className='flex justify-center text-xl my-2'>
  <hr style={{ height: '2px', backgroundColor: 'black', width: '23%' }} />
        </div>
      <Posts subreddit={currentName} />
    </div>
    <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport}/>
  </div>
  );
}