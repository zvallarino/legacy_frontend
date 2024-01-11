"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import AppContext from '../context/AppContext';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [currentName, setCurrentName] = useState('');

  return (
    <AppContext.Provider value={{ currentName, setCurrentName }}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AppContext.Provider>
  );
}