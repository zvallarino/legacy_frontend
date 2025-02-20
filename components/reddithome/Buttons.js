import React from 'react';
import { useRouter } from 'next/navigation';

function Buttons({show, setShow}) {
    const buttons = ["Top Subreddits", "PopCo Tables", "Extract Data"];
    const tags = ["top100", "popCo", "ssr", "gs"];
    const router = useRouter();
    
    function handleClick(e, i) {
        e.preventDefault();
        console.log('The link was clicked.');
        
        
        if (i == 0) {
            setShow(true);
        } else if (i == 1) {
            setShow(false);
        } else if (i == 2) {
            router.push('http://localhost:3000/postsubreddit');
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
        <div className='flex justify-center rounded-lg my-8'>
            <div className='flex justify-center rounded-lg bg-blue-600'>
                {buttonsMap()}
            </div>
        </div>
    );
}

export default Buttons;