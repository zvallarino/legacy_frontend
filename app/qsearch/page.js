"use client"

import PostSearch from '@/components/general/PostSearch';
import QSearch from '@/components/qsearch/QSearch';
import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import XHeader from '@/components/scrapper/XHeader';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Scrapper() {

  const [show, setShow] = useState(true);
  const [screenType, setScreenType] = useState('laptop'); // Default state

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


  return (
    <main className="w-full bg-white">

        {/* toolbar */}
        <Toolbar />

        <XHeader screenType ={screenType}/>
        
        {/* Buttons */}
        <ButtonsGeneral />
      
        {/* Pop Council Tables*/}
        <div className='text-black '><QSearch /></div>
      
        
    </main>
  )
}
