import React from 'react'
import { useRouter } from 'next/navigation';

function Toolbar() {

  const router = useRouter();

  const handleClick = () => {
    const pathname = router.pathname;
    router.push('http://127.0.0.1:8000/');
  };

  const handleOtherClick = () => {
    router.push('http://localhost:3000/');
};

const goBackHome = () => {
  router.push('/');
};

  
  return (
    <div className="bg-gray-800 py-4 px-6 flex justify-between items-center h-auto">
    <div className="text-white text-lg font-bold">Toolbar</div>
    <div className="flex space-x-4">
        <button
         onClick={handleClick} 
        className="text-white hover:text-gray-300">Django</button>
        <button
        onClick={handleOtherClick}
        className="text-white hover:text-gray-300">Next</button>
        <button
        onClick={goBackHome}
        className="text-white hover:text-gray-300">Button 3</button>
    </div>
</div>
  )
}

export default Toolbar