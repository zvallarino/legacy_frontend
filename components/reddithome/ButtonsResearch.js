import React from 'react';
import { useRouter } from 'next/navigation';
import { MdShortcut } from "react-icons/md";


function ButtonsResearch({show, setShow, screenType}) {
    const buttons = ["Terms", "Journals", "Authors", "Go Back"];
    const tags = ["top100", "popCo", "ssr", "gs"];
    const router = useRouter();
    

    function handleClick(e, i) {
        e.preventDefault();
        console.log('The link was clicked.');
        
        if (i == 0) {
            router.push('http://localhost:3000/rsearch');
        } else if (i == 1) {
            router.push('http://localhost:3000/general');
    
        } else if (i == 2) {
            router.push('http://localhost:3000/rauthorsearch');
        }else if (i == 3) {
            router.push('http://localhost:3000/rtables');
        }
    }
    
    const buttonsMap = () => buttons.map((button, index) => {
        let roundedClass = "";
        if (index === 0) {
            roundedClass = "rounded-l-lg"; // Round left corners for the first button
        } else if (index === buttons.length - 1) {
            roundedClass = "rounded-r-lg"; // Round right corners for the last button
        }
    
        return (
            <div key={index} 
                 onClick={e => handleClick(e, index)} 
                 className={`text-xl p-4 hover:bg-gray-500 ${roundedClass}`}>
                {button}
            </div>
        );
    });

    return (
        <div className='flex w-full mt-20'>
                  <div className="flex w-1/6 "></div>

         <div className='flex w-4/6 flex-col'>
              <div className='flex mt-2'>
                    <MdShortcut className={`text-black ${screenType === 'laptop' ? 'text-2xl ' : 'text-4xl'}`} />
        
                    <div className = {`text-blue-900 ${screenType === 'laptop' ? 'text-2xl ' : 'text-4xl'}`}>Quick Links</div>
              </div>
              <hr className="border-t-2 mb-2 border-blue-950 rounded-full" />

                <div className='flex justify-center rounded-lg  mt-2 w-full items-center justify-center '>
                
                   <div className="flex bg-blue-600 rounded-lg">
                     {buttonsMap()}
                     </div>
                </div>
         </div>
            <div className="flex w-1/6 "></div>

        </div>
    );
}

export default ButtonsResearch;