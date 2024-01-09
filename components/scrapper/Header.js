import React from 'react'
import Image from 'next/image';



function Header() {

    const Logo = () => {
        return (
            <div>
                <Image 
                    src="/images/pclogo.jpg" // Path under the public directory
                    alt="PC Logo" // Alt text for the image
                    width={100} // Width of the logo (you can adjust it)
                    height={50} // Height of the logo (you can adjust it)
                    // Optional: Add layout="responsive" if you want the image to scale with its container
                />
            </div>
        );
    };

  return (
    <div className = "h-auto bg-neutral-100">
    <div className= "flex items-center justify-center">
            <div className='bg-white flex items-center justify-center p-2 px-4 rounded-md shadow-sm text-black' >
                <div className="logo">
                    {Logo()}
                </div>
                <div className="title text-4xl">
                    <h1>Population Council</h1>
                    <h1>Web Scrapper</h1>
                </div>
            </div>
    </div>
    <div className="bg-white my-2 flex items-center justify-center p-2 px-4 rounded-md shadow-sm text-black text-sm">
        <p>
            The social media scraper provided by Population Council is intended for research purposes only. Users of this tool must ensure that their usage complies with all applicable laws and regulations. By using our social media scraper, you agree to use the data obtained strictly for research purposes and not for any illegal or unethical activities. Population Council is a non-profit organization and does not assume any liability or responsibility for the actions or consequences resulting from the use of our social media scraper. We expressly disclaim all warranties, whether express or implied, including but not limited to, the accuracy, completeness, or fitness for a particular purpose of the data obtained through our social media scraper. Any reliance on the data provided is at your own risk, and you agree to hold Population Council harmless from any and all claims, liabilities, damages, or losses that may arise from your use of our social media scraper.
        </p>
    </div>
</div>
  )
}

export default Header