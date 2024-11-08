import React from 'react';
import { useRouter } from 'next/navigation';

function ButtonsGeneral({show, setShow}) {
    const buttons = ["Communities", "Posts", "Comments", "Quick Search", "Go Back"];
    const tags = ["top100", "popCo", "ssr", "gs"];
    const router = useRouter();
    

    function handleClick(e, i) {
        e.preventDefault();
        console.log('The link was clicked.');
        
        if (i == 0) {
            router.push('http://localhost:3000/subreddit');
        
        } else if (i == 1) {
            router.push('http://localhost:3000/general');
    
        } else if (i == 2) {
            router.push('http://localhost:3000/comment');
    
        } else if (i == 3) {
            router.push('http://localhost:3000/qsearch');
        }else if (i == 4) {
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
                 className={`text-xl p-4 hover:bg-gray-500 ${roundedClass}`}>
                {button}
            </div>
        );
    });

    return (
        <div className='flex justify-center rounded-lg m-2'>
            <div className='flex justify-center rounded-lg bg-gray-600 m-2'>
                {buttonsMap()}
            </div>
        </div>
    );
}

export default ButtonsGeneral;