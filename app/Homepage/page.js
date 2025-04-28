// Updated Page.js
"use client"

import Buttons from '@/components/reddithome/Buttons';
import Tables from '@/components/reddithome/Tables';
import Toplist from '@/components/reddithome/Toplist';
import Boxes from '@/components/scrapper/Boxes';
import Explaination from '@/components/scrapper/Explaination';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Homepage() {
  const [show, setShow] = useState(false);
  const [screenType, setScreenType] = useState('laptop');
  
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
    <div className={`flex-col min-h-screen w-screen ${screenType === 'laptop' ? '' : ''}`}>
      {/* toolbar */}
      <Toolbar />

      {/* disclaimer */}
      <Header />
      
      {/* Pop Council Tables*/}
      <div className='text-black'><Boxes /></div>
    </div>
  )
}