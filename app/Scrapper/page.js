"use client"


import Boxes from '@/components/scrapper/Boxes';
import Explaination from '@/components/scrapper/Explaination';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import { useRouter } from 'next/navigation';


export default function Scrapper() {

  return (
    <main className="flex-col h-screen	w-screen bg-red-400">

        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <Header />

        {/* explaination */}
        <Explaination />
        {/* squares */}
        <div><Boxes /></div>
     
    </main>
  )
}
