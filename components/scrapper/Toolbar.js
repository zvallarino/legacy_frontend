// import React from 'react'
// import { useRouter } from 'next/navigation';

// function Toolbar() {

//   const router = useRouter();

//   const handleClick = () => {
//     const pathname = router.pathname;
//     router.push('http://localhost:3000/Homepage');
//   };

//   const handleOtherClick = () => {
//     router.push('http://localhost:3000/Scrapper');
// };

// const goBackHome = () => {
//   router.push('http://localhost:3000/general');
// };

// const goTop = () => {
//   router.push('http://localhost:3000/Scrapper');
// };

  
//   return (
//     <div className="bg-gray-800 py-4 px-6 flex justify-between items-center h-auto">
//     <div  onClick={goTop} className="text-white text-lg font-bold">Top Charts</div>
//     <div className="flex space-x-4">
//         <button
//          onClick={handleClick} 
//         className="text-white hover:text-gray-300">Hub</button>
//         <button
//         onClick={handleOtherClick}
//         className="text-white hover:text-gray-300">Charts</button>
//         <button
//         onClick={goBackHome}
//         className="text-white hover:text-gray-300">General Search</button>
//     </div>
// </div>
//   )
// }

// export default Toolbar

// Header.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaMap,
  FaChartBar,
  FaNewspaper,
  FaDatabase,
  FaSearch,
} from 'react-icons/fa';
import { IoEarthOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { TbShovel } from "react-icons/tb";
import { CiDatabase } from "react-icons/ci";
import { MdOutlineHub } from "react-icons/md";

import { FaBookAtlas } from "react-icons/fa6";

import { usePathname, useRouter } from 'next/navigation';

const Toolbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push('/tracker');
  };

  const navigationLinks = [
    { name: 'Hub', href: '/Homepage', icon: <MdOutlineHub /> },
    { name: 'Research', href: '/rtables', icon: <IoEarthOutline /> },
    { name: 'Social', href: '/Scrapper', icon: <IoShareSocialOutline /> },
    { name: 'Extract', href: '/postsubreddit', icon: <GoUpload /> },
    { name: 'Data', href: '/data', icon: <CiDatabase className='text-2xl'/> },
  ];

  return (
    <header className="w-full h-24 fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex border-b-2 border-blue-950">
      <div className="flex w-1/6"></div>
      <div className="flex w-4/6 bg-white-300">
        <div className="flex w-5/6 h-full items-center">
          <a href="https://www.popcouncil.org" className="ml-2">
            <img src="/Population_Council_Logo.png" alt="Logo" className="w-[150px] h-[75px]" />
          </a>

          <nav className="flex space-x-2 ml-2 justify-center items-center">
            {navigationLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${
                    pathname === link.href ? 'font-semibold text-blue-500' : ''
                  } text-xl px-4 py-2`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex w-1/6 h-full items-center justify-center">
          <form onSubmit={handleSearch} className="relative w-full px-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-7 text-black top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
        </div>
      </div>
      <div className="flex w-1/6"></div>
    </header>
  );
};

export default Toolbar;
