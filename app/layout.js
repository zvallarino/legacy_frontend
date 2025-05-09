"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import AppContext from '../context/AppContext';
import { useState } from 'react';
import Toolbar from '@/components/scrapper/Toolbar';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [currentName, setCurrentName] = useState('');
  const [postInfo, setPostInfo] = useState(true);

  return (
    <AppContext.Provider value={{ currentName, setCurrentName, postInfo, setPostInfo }}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AppContext.Provider>
  );
}