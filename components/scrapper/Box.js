import Image from 'next/image';
import React from 'react'

function Box({ social }) {
  return (
    <div className="card p-4 border border-gray-200 bg-white text-black rounded-lg shadow-sm mb-4"> {/* Added bg-white for white background and text-black for black text */}
        <div className="w-full h-52 flex justify-center items-center mb-4 relative"> {/* Adjusted div for image */}
          <Image 
            src={social.image} 
            alt={`${social.name} Logo`} 
            layout="fill" 
            objectFit="contain" // Keeps the aspect ratio of the image
          />
        </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="py-1 font-semibold">Name:</div>
        <div className="py-1">{social.name}</div>

        <div className="py-1 font-semibold">Number of Users:</div>
        <div className="py-1">{social.number_of_users}</div>

        <div className="py-1 font-semibold">Daily Users:</div>
        <div className="py-1">{social.daily_users}</div>

        <div className="py-1 font-semibold">Major Demographic:</div>
        <div className="py-1">{social.major_demographic}</div>

        <div className="py-1 font-semibold">Type of Content:</div>
        <div className="py-1">{social.type_of_content}</div>

        <div className="py-1 font-semibold">Founder:</div>
        <div className="py-1">{social.founder}</div>

        <div className="py-1 font-semibold">Year Founded:</div>
        <div className="py-1">{social.year_founded}</div>

        <div className="py-1 font-semibold">Headquarters:</div>
        <div className="py-1">{social.headquarters}</div>

        <div className="py-1 font-semibold">Parent Company:</div>
        <div className="py-1">{social.parent_company}</div>
      </div>
    </div>
  );
}
  
  export default Box;