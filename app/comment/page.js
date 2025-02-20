"use client"


import CommentSearch from '@/components/comment/CommentSearch';
import ButtonsGeneral from '@/components/reddithome/ButtonsGeneral';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import XHeader from '@/components/scrapper/XHeader';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Scrapper() {

  const [show, setShow] = useState(true);

  return (
    <main className="flex-col h-screen	w-screen bg-neutral-100">

        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <XHeader />
        
        {/* Buttons */}
        <ButtonsGeneral />

        {/* Pop Council Tables*/}
        <div className='text-black bg-neutral-100'><CommentSearch /></div>
      
        
    </main>
  )
}
