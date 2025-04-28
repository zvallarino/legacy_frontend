 "use client"

 import PostSearch from '@/components/general/PostSearch'; // Assuming used within Rsearch or other components
 import Rsearch from '@/components/general/Rsearch';
 import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral'; // Assuming used within ButtonsResearch or other components
 import ButtonsResearch from '@/components/reddithome/ButtonsResearch';
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
       // Using the same breakpoint as your first example (1424px)
       // Adjust this value based on your design's needs
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


   return (
     // --- Modified className to use screenType ---
     // Added conditional background colors as an example.
     // Change 'bg-green-100' and 'bg-red-100' (or add other classes)
     // based on how you want the layout to differ between laptop and desktop sizes.
     <main className={`flex-col h-screen w-screen ${screenType === 'laptop' ? '' : ''}`}>

       {/* toolbar */}
       <Toolbar />

       {/* disclaimer */}
       <XHeader screenType={screenType} />

       {/* Buttons */}
       <ButtonsResearch screenType={screenType}/>

       {/* Pop Council Tables or Search Component */}
       <div className='text-black '>
         <Rsearch screenType={screenType} />
       </div>

     </main>
   )
 }