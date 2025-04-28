
import React from 'react';
import Rows from './Rows';

function TableTL({ table, screenType }) {
    const headers =
    ["Name", "Description", "Subscribers"] 

    return (
        <div className={`border-collapse border border-gray-400 rounded-lg ${screenType === 'laptop' ? 'mx-2' : 'mx-4'} my-2 shadow-md`}>
            <div className={`text-black ${screenType === 'laptop' ? 'text-sm' : 'text-xl'} p-4 rounded-lg flex justify-between `}>
                {headers.map(header => <div key={header}>{header}</div>)}
            </div>
            <hr/>
            {table.map((row, index) => (
                <div key={index} className="text-lg p-2 bg-white text-black hover:bg-blue-100">
                    <Rows row={row} screenType ={screenType}/>
                </div>
            ))}
        </div>
    );
}

export default TableTL;