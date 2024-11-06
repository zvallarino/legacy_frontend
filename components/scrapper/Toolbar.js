import React from 'react'
import { useRouter } from 'next/navigation';

function Toolbar() {

  const router = useRouter();

  const handleClick = () => {
    const pathname = router.pathname;
    router.push('http://localhost:3000/Homepage');
  };

  const handleOtherClick = () => {
    router.push('http://localhost:3000/Scrapper');
};

const goBackHome = () => {
  router.push('http://localhost:3000/general');
};

const goTop = () => {
  router.push('http://localhost:3000/Scrapper');
};

  
  return (
    <div className="bg-gray-800 py-4 px-6 flex justify-between items-center h-auto">
    <div  onClick={goTop} className="text-white text-lg font-bold">Top Charts</div>
    <div className="flex space-x-4">
        <button
         onClick={handleClick} 
        className="text-white hover:text-gray-300">Hub</button>
        <button
        onClick={handleOtherClick}
        className="text-white hover:text-gray-300">Charts</button>
        <button
        onClick={goBackHome}
        className="text-white hover:text-gray-300">General Search</button>
    </div>
</div>
  )
}

export default Toolbar