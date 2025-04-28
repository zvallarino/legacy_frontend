// Updated Boxes.js
import React from 'react'
import socialmedia from "../../socialmedia.json";
import Box from './Box'
import { TbCards } from "react-icons/tb";

function Boxes() {
    const allsocial = socialmedia.map((social, index) => (
        <Box key={index} social={social} />
    ));

    return (
        <div className='flex mt-6 lg:mt-12 px-4'>
            <div className="hidden lg:flex w-1/6"></div>

            <div className='flex flex-col w-full lg:w-4/6 justify-evenly'>
                <div className='flex items-center'>
                    <TbCards className='ml-2 text-3xl lg:text-4xl font-bold text-blue-900'/>
                    <div className='ml-2 text-3xl lg:text-4xl font-bold text-blue-900'>Cards</div>
                </div>
                <hr className="my-3 lg:my-4 border-t-2 border-blue-950 rounded-full" />

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4'>
                    {allsocial}
                </div>
            </div>

            <div className="hidden lg:flex w-1/6"></div>
        </div>
    );
}

export default Boxes;
