"use client"

 import PostSearch from '@/components/general/PostSearch';
 import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
 import Header from '@/components/scrapper/Header'; // Assuming used within XHeader or other components
 import Toolbar from '@/components/scrapper/Toolbar';
 import XHeader from '@/components/scrapper/XHeader';
 import { useRouter } from 'next/navigation';
 // Import useEffect along with useState
 import { useState, useEffect } from 'react';


 export default function Scrapper() {

   const [show, setShow] = useState(true); // This state seems unused currently

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
     // --- Modified className to use screenType ---
     // Using example background colors. Customize 'bg-green-100', 'bg-red-100',
     // and the breakpoint (1424px) according to your design needs.
 <main className="w-full bg-white">

       {/* toolbar */}
       <Toolbar />

       {/* disclaimer */}
       <XHeader screenType ={screenType} />

       {/* Buttons */}
       <ButtonsGeneral   />

       {/* Post Search Component */}
       <div className='text-black '>
         <PostSearch  screenType ={screenType}/>
       </div>

     </main>
   )
 }