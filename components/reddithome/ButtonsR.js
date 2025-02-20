import React from 'react';
import { useRouter } from 'next/navigation';

function ButtonsR({show, setShow, togglePopup}) {
    const buttons = ["Edit Interests", "Extract Data"];
    const tags = ["top100", "popCo", "ssr", "gs"];
    const router = useRouter();
    
    function handleClick(e, i) {
        e.preventDefault();
        console.log('The link was clicked.');
        
        
        if (i == 0) {
            console.log('hello')
            togglePopup()
        } 
         else  {
            router.push('http://localhost:3000/rsearch');
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
            <div className='flex justify-center rounded-lg bg-blue-600 m-2'>
                {buttonsMap()}
            </div>
        </div>
    );
}

export default ButtonsR;