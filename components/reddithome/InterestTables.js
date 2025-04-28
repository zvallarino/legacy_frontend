import React from 'react';
// Removed TableTL import as it wasn't used
import TableR from './TableR';

function InterestTables({ categories, screenType }) {
  const tableElements = [];

  // Object.entries returns an array of [key, value] pairs.
  Object.entries(categories).forEach(([categoryName, subredditsArray]) => {
    if (subredditsArray && subredditsArray.length) {
      tableElements.push(
        // *** MODIFIED LINE HERE ***
        // Added padding p-2 for spacing between cards
        // Conditionally set width: w-1/2 (50%) for laptop, w-1/3 (33.3%) otherwise
        <div key={categoryName} className={` ${screenType === 'laptop' ? 'w-1/2' : 'w-1/3'}`}>
          <h1 className={`text-blue-900 ${screenType === 'laptop' ? 'text-lg' : 'text-2xl'}`}>{categoryName}</h1>
          <TableR table={subredditsArray} categoryName={categoryName} screenType={screenType} />
        </div>
      );
    }
  });

  // Ensure the parent container allows wrapping
  return <div className="flex flex-wrap">{tableElements}</div>;
}

export default InterestTables;