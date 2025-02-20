import React, { useContext } from 'react'
import Image from 'next/image';
import { PiCirclesThreeLight } from "react-icons/pi";
import { MdDetails } from "react-icons/md";
import AppContext from '@/context/AppContext';




function DHeader() {

  const { postInfo } = useContext(AppContext);

  const title = postInfo.name


  return (
<div className = "flex  w-full h-1/6 mt-24">
    <div className="flex w-1/6 "></div>

   <div className='flex w-4/6 flex-col '>
        <div className= "">
                <div className='border-b-2 border-black' >
               
                    <div className="flex title text-4xl justify-center items-center my-4">
                    <MdDetails className='text-slate-800 text-6xl' /><h1 className='text-6xl text-slate-800 font-bold'>{title} Details</h1>
                            
    
                    
                    </div>
                </div>
        </div>
        <div className="">
            <p className='text-black mt-2'>
                The social media scraper provided by Population Council is intended for research purposes only. Users of this tool must ensure that their usage complies with all applicable laws and regulations. By using our social media scraper, you agree to use the data obtained strictly for research purposes and not for any illegal or unethical activities. Population Council is a non-profit organization and does not assume any liability or responsibility for the actions or consequences resulting from the use of our social media scraper. We expressly disclaim all warranties, whether express or implied, including but not limited to, the accuracy, completeness, or fitness for a particular purpose of the data obtained through our social media scraper. Any reliance on the data provided is at your own risk, and you agree to hold Population Council harmless from any and all claims, liabilities, damages, or losses that may arise from your use of our social media scraper.
            </p>
        </div>
   </div>

    <div className="flex w-1/6 "></div>

</div>
  )
}

export default DHeader