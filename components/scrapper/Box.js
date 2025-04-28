// Updated Box.js
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';

function Box({ social }) {
  
  const router = useRouter();

  const handleClick = () => {
    const pathname = router.pathname;
    router.push(social.link);
  };

  return (
    <div onClick={handleClick} className="card w-full max-w-sm h-auto p-3 lg:p-4 border border-gray-200 bg-white shadow-md hover:bg-blue-100 text-black rounded-lg shadow-sm mb-3 lg:mb-4 transition duration-150 ease-in-out">
        <div className="w-full h-28 lg:h-32 flex justify-center items-center mb-3 lg:mb-4 relative">
          <Image 
            src={social.image} 
            alt={`${social.name} Logo`}
            layout="fill" 
            objectFit="contain"
          />
        </div>
      
      <div className="grid grid-cols-2 gap-1 text-sm">
        <div className="py-1 font-semibold">Name:</div>
        <div className="py-1">{social.name}</div>

        <div className="py-1 font-semibold">Parent Company:</div>
        <div className="py-1">{social.parent_company}</div>

        <div className="py-1 font-semibold">Number of Users:</div>
        <div className="py-1">{social.number_of_users}</div>

        <div className="py-1 font-semibold">Major Demographic:</div>
        <div className="py-1">{social.major_demographic}</div>

        <div className="py-1 font-semibold">Type of Content:</div>
        <div className="py-1">{social.type_of_content}</div>
      </div>
    </div>
  );
}
  
export default Box;