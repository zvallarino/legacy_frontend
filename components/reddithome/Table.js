import React from 'react';
import Rows from './Rows';

function Table({ table, screenType }) {
    const headers = ["Rank", "Subreddit", "Number"]; // Updated headers

    return (
        <div className={`border-collapse border border-gray-400 rounded-lg ${screenType === 'laptop' ? 'mx-2' : 'mx-4'} my-2 shadow-md`}>
            <div className={`text-black ${screenType === 'laptop' ? 'text-xs' : 'text-xl'} p-4 rounded-lg flex justify-between`} >
                {headers.map(header => <div key={header}>{header}</div>)}
            </div>
            <hr/>
            {table.map((row, index) => (
                <div key={index} className="text-lg p-4 bg-white text-black hover:bg-blue-100">
                    <Rows row={row} />
                </div>
            ))}
        </div>
    );
}

export default Table;