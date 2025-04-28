import React from 'react';
import tabledata from "../../subreddits.json";
import Table from './Table';
import TableTL from './TableTL';

function Toplist({ categories, screenType  }) {
    const tableElements = [];

    categories.forEach((category, index) => {
        // Assuming 'subreddits' is the array to be passed to the Table component
        if (category.subreddits && category.subreddits.length) {
            tableElements.push(
                <div key={category.id} className="w-1/3 p-2">
                    <h1 className={`${screenType === 'laptop' ? 'text-xl' : 'text-2xl'} text-blue-900 text-2xl ml`}>{category.name}</h1>
                    <TableTL table={category.subreddits} screenType={screenType}/>
                </div>
            );
        }
    });

    return <div className="flex flex-wrap">{tableElements}</div>;
}

export default Toplist;