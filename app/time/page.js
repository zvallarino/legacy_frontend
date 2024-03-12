"use client"

import SubredditSearch from '@/components/Search/SubredditSearch';
import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import TimeSearch from '@/components/time/TimeSearch';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Scrapper() {

  const [show, setShow] = useState(true);

  return (
    <main className="flex-col h-screen	w-screen bg-neutral-100">

        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <Header />
        
        {/* Buttons */}
        <ButtonsGeneral />
      
        {/* Pop Council Tables*/}
        <div className='text-black bg-neutral-100'><TimeSearch /></div>
      
        
    </main>
  )
}