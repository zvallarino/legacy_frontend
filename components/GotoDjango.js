"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function GotoDjango() {

    const router = useRouter();

  const handleClick = () => {
    const pathname = router.pathname;
    router.push('http://127.0.0.1:8000/');
  };

  const handleOtherClick = () => {
    router.push('/Homepage');
};


  return (
    <div className="bg-white w-full h-full flex flex-col items-center">
        <button 
            className="px-5 py-2.5 text-2xl font-bold text-black bg-white rounded-md shadow-md cursor-pointer w-full mt-4"
            onClick={handleClick}>
            Web Scraper
        </button>

        <div 
            onClick={handleClick} 
            className='rounded-lg mt-8 hover:bg-blue-100 cursor-pointer'>
            <Image
                src={"https://i.imgur.com/CSXfJgI.jpg"}
                alt={"friendly robot"}
                width={250}
                height={150}
                className="mx-auto rounded-lg shadow-xl"
            />
        </div>

        <div 
          onClick={handleOtherClick}
            className='text-xl font-bold text-black bg-white text-center mt-4 p-2 rounded-md shadow-md w-1/2 hover:bg-blue-100 cursor-pointer'>
            Click Here
        </div>
    </div>
  )
}


