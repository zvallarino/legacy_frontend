import React from 'react';
import TableTL from './TableTL';
import TableR from './TableR';

function InterestTables({ categories }) {
  const tableElements = [];

  // Object.entries returns an array of [key, value] pairs.
  Object.entries(categories).forEach(([categoryName, subredditsArray]) => {
    if (subredditsArray && subredditsArray.length) {
      tableElements.push(
        <div key={categoryName} className="w-1/3 p-2">
          <h1 className="text-blue-900 text-2xl">{categoryName}</h1>
          <TableR table={subredditsArray} categoryName = {categoryName} />
        </div>
      );
    }
  });

  return <div className="flex flex-wrap">{tableElements}</div>;
}

export default InterestTables;