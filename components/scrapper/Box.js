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
    <div onClick = {handleClick} className="card w-[420px] h-180 p-4 mx-12 border border-gray-200 bg-white shadow-md hover:bg-blue-100 text-black rounded-lg shadow-sm mb-4 transition duration-150 ease-in-out"> {/* Added bg-white for white background and text-black for black text */}
        <div className="w-full h-40 flex justify-center items-center mb-4 relative"> {/* Adjusted div for image */}
          <Image 
            src={social.image} 
            alt={`${social.name} Logo`} 
            layout="fill" 
            objectFit="contain" // Keeps the aspect ratio of the image
          />
        </div>
      
      <div className="grid grid-cols-2 gap-1">
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
{/* 
        <div className="py-1 font-semibold">Year Founded:</div>
        <div className="py-1">{social.year_founded}</div>

        <div className="py-1 font-semibold">headquarters:</div>
        <div className="py-1">{social.headquarters}</div> */}


      </div>
    </div>
  );
}
  
  export default Box;