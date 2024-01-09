import React from 'react';

function Buttons() {
    const buttons = ["Top Subreddits", "PopCo Tables", "Subreddit Search", "General Search"];

    const buttonsMap = () => buttons.map((button, index) => {
        return (
            <div key={index} className="text-xl p-4 hover:bg-gray-600">
                {button}
            </div>
        );
    });

    return (
        <div className='flex justify-center rounded-lg m-2'>
            <div className='flex justify-center rounded-lg bg-gray-800 m-2'>
                {buttonsMap()}
            </div>
        </div>
    );
}

export default Buttons;