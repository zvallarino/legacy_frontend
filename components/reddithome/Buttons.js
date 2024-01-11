import React from 'react';
import { useRouter } from 'next/navigation';

function Buttons({show, setShow}) {
    const buttons = ["Top Subreddits", "PopCo Tables", "General Search"];
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
            router.push('http://localhost:3000/subreddit');
            // send to http://localhost:3000/subreddit
        }
    }
    const buttonsMap = () => buttons.map((button, index) => {
        return (
            <div key={index} onClick={e => handleClick(e,index)} className="text-xl p-4 hover:bg-gray-600">
                
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

export default Buttons;