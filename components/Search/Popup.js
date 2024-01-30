import React, { useState } from 'react';

function Popup({ show, onClose, onExport }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClose = () => {
    setShowDropdown(false); // Reset showDropdown to false
    onClose(); // Call the passed onClose function
  };


  if (!show) return null;

  const handleRangeSelect = (range) => {
    onExport(range);
    setShowDropdown(false); // Optionally hide the dropdown after selection
  };
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg relative p-8">
        <button onClick={handleClose} className="absolute top-2 right-2">
          X {/* Replace with an icon if you have one */}
        </button>
        <div className="text-center text-xl">
          <span>Would you like to export the </span>
          <span className="block">current subreddit data?</span>

          {showDropdown ? (
            <div className="mt-4">
              <select onChange={(e) => handleRangeSelect(e.target.value)} className="px-4 py-2 rounded-lg bg-gray-200">
                <option value="1d">1 Day</option>
                <option value="1w">1 Week</option>
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="1y">1 Year</option>
                <option value="all">All</option>
              </select>
            </div>
          ) : (
            <div className="flex justify-around mt-4">
              <button onClick={() => setShowDropdown(true)} className="px-4 py-2 rounded-lg bg-gray-200">
                Custom Range
              </button>
              <button onClick={() => onExport('all')} className="px-4 py-2 rounded-lg bg-gray-200">
                All
              </button>
            </div>
          )}

          <button
            onClick={() => onExport('export')}
            className="mt-4 px-4 py-2 rounded-lg bg-transparent hover:bg-green-600"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
export default Popup;