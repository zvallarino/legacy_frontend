"use client"



import PostSearch from '@/components/general/PostSearch';
import QSearch from '@/components/qsearch/QSearch';
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
        <div className='text-black bg-neutral-100'><QSearch /></div>
      
        
    </main>
  )
}
