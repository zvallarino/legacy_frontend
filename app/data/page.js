"use client"

import Toolbar from '@/components/scrapper/Toolbar';
import Trends from '@/components/Trends';
import React from 'react';


const TrendsPage = () => {
  return (
    <div className="w-full h-screen">
      <Toolbar />
      <Trends />
    </div>
  );
};

export default TrendsPage;