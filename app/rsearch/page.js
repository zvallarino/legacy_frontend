"use client"



import PostSearch from '@/components/general/PostSearch';
import Rsearch from '@/components/general/Rsearch';
import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
import ButtonsResearch from '@/components/reddithome/ButtonsResearch';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import XHeader from '@/components/scrapper/XHeader';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Scrapper() {

  const [show, setShow] = useState(true);

  return (
    <main className="flex-col h-screen	w-screen ">

        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <XHeader />
        
        {/* Buttons */}
        <ButtonsResearch />
      
        {/* Pop Council Tables*/}
        <div className='text-black '><Rsearch /></div>
      
        
    </main>
  )
}
