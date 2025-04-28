import React from 'react';
import { useRouter } from 'next/navigation';
import { MdShortcut } from "react-icons/md";


function ButtonsGeneral({show, setShow, screenType}) {
    const buttons = ["Communities", "Posts", "Comments", "Quick Search","Incremental", "Go Back"];
    const tags = ["top100", "popCo", "ssr", "gs"];
    const router = useRouter();
    

    function handleClick(e, i) {
        e.preventDefault();
        console.log('The link was clicked.');
        
        if (i == 0) {
            router.push('http://localhost:3000/postsubreddit');
        
        } else if (i == 1) {
            router.push('http://localhost:3000/general');
    
        } else if (i == 2) {
            router.push('http://localhost:3000/comment');
    
        } else if (i == 3) {
            router.push('http://localhost:3000/qsearch');
        }else if (i == 4) {
            router.push('http://localhost:3000/incremental');
        } else if (i == 5) {
        router.push('http://localhost:3000/Scrapper');
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
                 className={`${screenType === 'laptop' ? 'text-m' : 'text-xl'}  p-4 hover:bg-gray-500 ${roundedClass}`}>
                {button}
            </div>
        );
    });

    return (
        <div className={`flex w-full ${screenType === 'laptop' ? 'mt-28 ' : 'mt-20 '}`}>
                  <div className="flex w-1/6 "></div>

         <div className='flex w-4/6 flex-col'>
              <div className='flex'>
                    <MdShortcut className='text-black text-4xl' />
        
                    <div className = 'text-blue-900 text-4xl'>Quick Links</div>
              </div>
              <hr className="border-t-2 mb-2 mt-2 border-blue-950 rounded-full" />

                
                <div className='flex justify-center rounded-lg  m-2 w-full items-center justify-center '>
                
                   <div className="flex bg-blue-600 rounded-lg">
                     {buttonsMap()}
                     </div>
                </div>
         </div>
            <div className="flex w-1/6 "></div>

        </div>
    );
}

export default ButtonsGeneral;