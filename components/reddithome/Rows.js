import React from 'react';

function Rows({row}) {
    return (
        <div className='flex justify-between'>
            <div className='text-sm mr-2 font-bold'>{row.Subreddit}</div>
            <div className='text-sm text-left'>{row.Description}</div>
            <div className='text-sm text-left'>{row.Subscribers}</div>
        </div>
    );
}

export default Rows;