import React from 'react';
import tabledata from "../../subreddits.json";
import Table from './Table';

function Tables() {
    const tableKeys = Object.keys(tabledata); // Get all keys from the tabledata object
    const tableElements = []; // Array to hold JSX elements for tables

    for (let i = 0; i < tableKeys.length; i += 3) {
        // Group every three tables in a row
        const rowTables = [];
        for (let j = i; j < i + 3 && j < tableKeys.length; j++) {
            const key = tableKeys[j];
            const value = tabledata[key];
            console.log(`Property: ${key}, Value: ${value}`);
            // Create JSX for each table and push it into the rowTables array
            rowTables.push(
                <div key={key} className="w-1/3 p-2">
                    <h1 className='text-2xl text-black'>{key}</h1>
                    <Table table={value} />
                </div>
            );
        }
        // Wrap every two tables in a div to create a row
        tableElements.push(
            <div key={`row-${i}`} className="flex">
                {rowTables}
            </div>
        );
    }

    return <div>{tableElements}</div>;
}

export default Tables;