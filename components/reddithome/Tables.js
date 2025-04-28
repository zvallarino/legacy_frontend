import React from 'react';
import tabledata from "../../subreddits.json";
import Table from './Table';

function Tables({ categories,screenType }) {
    const tableElements = [];

    categories.forEach((category, index) => {
        // Assuming 'subreddits' is the array to be passed to the Table component
        if (category.subreddits && category.subreddits.length) {
            tableElements.push(
                <div key={category.id} className="w-1/3 p-2">
                    <h1 className={`${screenType === 'laptop' ? 'text-lg' : 'text-2xl'} `}>{category.name}</h1>
                    <Table table={category.subreddits} screenType ={screenType}/>
                </div> 
            );
        }
    });

    return <div className="flex flex-wrap">{tableElements}</div>;
}

export default Tables;