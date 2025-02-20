"use client"


import Buttons from '@/components/reddithome/Buttons';
import Tables from '@/components/reddithome/Tables';
import Toplist from '@/components/reddithome/Toplist';
import Header from '@/components/scrapper/Header';
import Toolbar from '@/components/scrapper/Toolbar';
import react, { useEffect, useState } from 'react';
import 'simplebar/dist/simplebar.min.css';
import dynamic from 'next/dynamic';
import THeader from '@/components/scrapper/THeader';
import { BsSave2 } from 'react-icons/bs';




export default function Scrapper() {

  const [show, setShow] = useState(false);

 
  const [categories, setCategories] = useState([]);
  const [TopPC, setTopPC] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTop100Categories() {
    const url1 = 'http://127.0.0.1:8000/top100_category_list.json';
    const url2 = 'http://127.0.0.1:8000/category_list.json';
  
    try {
      const response1 = await fetch(url1);
      const response2 = await fetch(url2);
  
      if (!response1.ok) {
        throw new Error(`Error: ${response1.status}`);
      }
      if (!response2.ok) {
        throw new Error(`Error: ${response2.status}`);
      }
  
      const data1 = await response1.json();
      const data2 = await response2.json();
  
      return { top100Categories: data1, topPCCategories: data2 };
    } catch (error) {
      console.error('There was an error fetching the categories:', error);
      throw error; // Rethrow the error to be handled in the caller
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      try {
        const { top100Categories, topPCCategories } = await fetchTop100Categories();
        setCategories(top100Categories);
        setTopPC(topPCCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <main className="flex-col h-screen	w-screen bg-white hide-scrollbar::-webkit-scrollbar ">

        {/* toolbar */}
        <Toolbar />

        {/* disclaimer */}
        <THeader />
        
        {/* Buttons */}
        <div className='flex   items-center justify-center my-8' >{<Buttons setShow = {setShow}  show = {show}/>}</div>
      

        {/* Pop Council Tables*/}
        <div className='text-black flex w-full '>
          <div className='flex w-1/6'></div>
          <div className='flex w-4/6 flex-col'>
                 <div className='text-blue-900 text-4xl flex'><div className='mr-4'><BsSave2 /></div>
                 Tracked Communities</div>
                 <hr className="my-4 border-t-2 border-blue-950 rounded-full" />
          {show?<Tables categories = {categories} />:<Toplist categories ={TopPC}/>}
          </div>
          <div className='flex w-1/6'></div>
        </div>
      
    </main>
  )
}
