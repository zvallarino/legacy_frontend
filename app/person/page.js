"use client"



import PersonSearch from '@/components/person/PersonSearch';
import Buttons from '@/components/reddithome/Buttons';
import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
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
        <div className='text-black bg-neutral-100'><PersonSearch /></div>
      
        
    </main>
  )
}
