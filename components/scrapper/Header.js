// Updated Header.js
import React from 'react'
import Image from 'next/image';
import { PiCirclesThreeLight } from "react-icons/pi";

function Header() {
  return (
    <div className="flex w-full mt-16 lg:mt-28 px-4">
      <div className="hidden lg:flex w-1/6"></div>

      <div className="flex flex-col w-full lg:w-4/6">
        <div className="border-b-2 border-black flex flex-col items-center">
          <h1 className="text-3xl lg:text-4xl text-slate-800 font-bold">Site Hub</h1>
          <PiCirclesThreeLight className="text-slate-800 text-4xl my-3 lg:my-4" />
        </div>
        
        <p className="text-black mt-3 text-xs lg:text-xs leading-relaxed">
          The social media scraper provided by Population Council is intended for research purposes only. Users of this tool must ensure that their usage complies with all applicable laws and regulations. By using our social media scraper, you agree to use the data obtained strictly for research purposes and not for any illegal or unethical activities. Population Council is a non-profit organization and does not assume any liability or responsibility for the actions or consequences resulting from the use of our social media scraper. We expressly disclaim all warranties, whether express or implied, including but not limited to, the accuracy, completeness, or fitness for a particular purpose of the data obtained through our social media scraper. Any reliance on the data provided is at your own risk, and you agree to hold Population Council harmless from any and all claims, liabilities, damages, or losses that may arise from your use of our social media scraper.
        </p>
      </div>

      <div className="hidden lg:flex w-1/6"></div>
    </div>
  );
}

export default Header;