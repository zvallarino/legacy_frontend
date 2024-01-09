"use client";

import React from "react";
import exampleData from "../example.json";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';


function Followers() {
  const [data, setData] = useState(exampleData);

  const router = useRouter();

  const handleClick = (objecX) => {
    const pathname = router.pathname;
    router.push(objecX.link);
  };

  

  const boxCreator = () =>
  data.map((singleObject, index) => (
    <div key={singleObject.id || index} className="flex flex-col border-2 p-4 items-center justify-center h-1/2 m-2 rounded-md shadow-md bg-white hover:bg-blue-100 transition-colors duration-150" style={{ width: '250px', height: '200px' }}>      <div  onClick={() => handleClick(singleObject)} className="flex justify-center items-center w-full h-3/4">
        <Image
          src={singleObject.image}
          alt={singleObject.type}
          width={75}
          height={75}
          className="mx-auto"
        />
      </div>
      <div className="text-center">
        <div className="font-bold text-black ">{singleObject.number}</div>
        <div className="text-black ">{singleObject.type}</div>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col h-full w-full px-2 bg-neutral-100">
      <div>
        <h1 className="text-2xl font-bold my-4 border-b-2 bg-white shadow-md  text-black py-4 px-2 rounded-md">Social Media Followers</h1>
      </div>
     
      <div className="bg-neutral-100 h-full">
        <div className="flex flex-wrap -mx-2 justify-center mt-8 bg-neutral-100">
          {boxCreator()}
        </div>
      </div>
    </div>
  );
}

export default Followers;
