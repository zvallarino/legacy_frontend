"use client";

import React from "react";
import exampleData from "../example.json";
import { useState } from "react";
import Image from "next/image";

function Followers() {
  const [data, setData] = useState(exampleData);
  

  const boxCreator = () =>
    data.map((singleObject) => (
      <div class="flex flex-col w-1/3 border-2 p-4 items-center justify-center h-1/2">
        <div class="flex justify-center items-center w-full h-3/4">
          <Image
            src={singleObject.image}
            alt={singleObject.type}
            width={50}
            height={50}
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
    <div className="flex flex-col h-full w-full">
      <div>
        <h1 className="text-2xl font-bold my-4 text-black">Social Media Followers</h1>
      </div>
     
      <div className="flex flex-wrap -mx-2 items-center">
        {boxCreator()}
      </div>
    </div>
  );
}

export default Followers;
