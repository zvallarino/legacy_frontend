
import React from 'react';
import Rows from './Rows';
import RowsR from './RowsR';

function TableR({ table, categoryName, screenType }) {
    const headers =
    ["Journal", "Title", "Pub Date"] 

    return (
        <div className="border-collapse border border-gray-400 rounded-lg mx-4 my-2 shadow-md">
            <div className={`text-black ${screenType === 'laptop' ? 'text-md' : 'text-2xl'} p-4 rounded-lg flex justify-between`} >
                {headers.map(header => <div key={header}>{header}</div>)}
            </div>
            <hr/>
            {table.map((row, index) => (
                <div key={index} className="text-lg p-2 bg-white text-black hover:bg-blue-100">
                    <RowsR row={row} categoryName = {categoryName} screenType={screenType}/>
                </div>
            ))}
        </div>
    );
}

export default TableR;