"use client"


import Buttons from '@/components/reddithome/Buttons';
import Tables from '@/components/reddithome/Tables';
import Boxes from '@/components/scrapper/Boxes';
import Explaination from '@/components/scrapper/Explaination';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import { useRouter } from 'next/navigation';


export default function Scrapper() {

  return (
    <main className="flex-col h-screen	w-screen bg-neutral-100">

        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <Header />
        
        {/* Buttons */}
        <div className=''><Buttons /></div>
      

        {/* Pop Council Tables*/}
        <div className=''><Tables /></div>
      
        
    </main>
  )
}
