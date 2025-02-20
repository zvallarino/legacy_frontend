"use client";

import Toolbar from '@/components/scrapper/Toolbar';
import DHeader from '@/components/scrapper/DHeader';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import AppContext from '@/context/AppContext';
import Sidebar from '@/components/details/Sidebar';
import Graph from '@/components/details/Graph';
import Posts from '@/components/details/Posts';
import Popup from '@/components/Search/Popup';
import * as XLSX from 'xlsx';
import { BsFillSignpostSplitFill, BsSave2 } from 'react-icons/bs';
import { GrGraphQl } from 'react-icons/gr';

import GraphR from '@/components/details/GraphR';
import SidebarR from '@/components/details/SidebarR';
import PostsR from '@/components/details/PostsR';

export default function Scrapper() {
  const router = useRouter();
  const { currentName } = useContext(AppContext);
  const [timeRange, setTimeRange] = useState("7d");
  const [dateRange, setDateRange] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet([], {
      header: [
        "subreddit",
        "username",
        "icon_url",
        "created_utc",
        "title",
        "score",
        "num_comments",
      ],
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "exported_data.xlsx");
  };

  const handleExport = (type) => {
    console.log(`Export type: ${type}`);
    exportToExcel();
    handlePopupClose();
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  console.log(currentName);

  return (
    <div className="flex flex-col h-screen w-screen text-black">
      <Toolbar />
      <DHeader />

      {/* Main content area */}
      <div className="flex w-full h-1/2 mt-12">
        {/* Left Spacer */}
        <div className="w-1/6" />

        {/* Central container */}
        <div className="w-4/6 flex flex-col">
          {/* Header Section */}
          <div className="flex items-center text-blue-900 text-4xl">
            <div className="mr-4">
              <GrGraphQl />
            </div>
            OVERVIEW
          </div>
          {/* Make hr span the full width */}
          <hr className="w-full my-4 border-t-2 border-blue-950" />

          {/* Sidebar & Graph */}
          <div className="flex w-full mt-4  flex-1">
            {/* Sidebar: fixed width */}
            <div className="w-1/4 flex items-center justify-center">
              <SidebarR
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                currentName={currentName}
                onExportClick={togglePopup}
              />
            </div>
            {/* Graph: takes remaining space */}
            <div className="flex-1 ml-4">
              <GraphR currentName={currentName} />
            </div>
          </div>
        </div>

        {/* Right Spacer */}
        <div className="w-1/6" />
      </div>

      {/* Posts Section */}
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

      <PostsR subreddit={currentName} />
      <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport} />
    </div>
  );
}
