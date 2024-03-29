import React from 'react';
import tabledata from "../../subreddits.json";
import Table from './Table';

function Tables({ categories }) {
    const tableElements = [];

    categories.forEach((category, index) => {
        // Assuming 'subreddits' is the array to be passed to the Table component
        if (category.subreddits && category.subreddits.length) {
            tableElements.push(
                <div key={category.id} className="w-1/3 p-2">
                    <h1 className='text-2xl text-black ml'>{category.name}</h1>
                    <Table table={category.subreddits} />
                </div>
            );
        }
    });

    return <div className="flex flex-wrap">{tableElements}</div>;
}

export default Tables;