"use client"



import Toolbar from '@/components/scrapper/Toolbar';
import Header from '@/components/scrapper/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import AppContext from '@/context/AppContext';
import Sidebar from '@/components/details/Sidebar';
import Graph from '@/components/details/Graph';
import Posts from '@/components/details/Posts';

export default function Scrapper() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const { currentName } = useContext(AppContext);

  console.log(currentName)

  return (
    <main className="flex-col h-screen w-screen bg-neutral-100">
      <Toolbar />
      <Header />

      <div>
        <Sidebar currentName = {currentName}/>
        <Graph />
        <Posts subreddit = {currentName} />
      </div>
    
    </main>
  );
}