"use client"

import Buttons from '@/components/reddithome/Buttons';
import Tables from '@/components/reddithome/Tables';
import Toplist from '@/components/reddithome/Toplist';
import Boxes from '@/components/scrapper/Boxes';
import Explaination from '@/components/scrapper/Explaination';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Homepage() {

  const [show, setShow] = useState(false)
  return (

<div className="flex-col h-screen	w-screen bg-neutral-100">



        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <Header />
        
        {/* Buttons */}
        <div className='' onClick={()=>setShow(!show)}><Buttons show ={show} setShow ={setShow} /></div>
      

        {/* Pop Council Tables*/}
        <div className='text-black'><Boxes /></div>



    </div>

  )
}
