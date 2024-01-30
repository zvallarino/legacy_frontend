"use client"
import React, { useState } from 'react';
import SRow from './SRow';
import { CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import Popup from './Popup'; // Import the Popup component
import * as XLSX from 'xlsx';



function SubredditSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupClose = () => {
        setShowPopup(false);
      };

      const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet([], {
          header: ["subreddit", "username", "icon_url", "created_utc", "title", "score", "num_comments"],
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
    
        XLSX.writeFile(wb, "exported_data.xlsx");
      };
    
      const handleExport = (type) => {
        console.log(`Export type: ${type}`);
        // Add your export logic here
        exportToExcel()
        handlePopupClose();
      };

      


    const searchSubreddits = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/search/?q=${query}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setResults(data);
            console.log(data)
        } catch (error) {
            console.error('There was an error fetching the search results:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            searchSubreddits();
        }
    };

    return (
        <div>
            
          <div className= 'flex justify-center'>

          {results.length > 0 && (
      <div className='flex items-center border-t-2 border-b-2 border-l-2 border-gray-300 rounded-l-lg justify-center px-2 hover:bg-green-600'  onClick={() => setShowPopup(true)}>
      <CiExport size="30" className="mx-2" /> {/* Icon */}
  </div>
    )}

          <form onSubmit={handleSubmit} className="flex items-center border-2 border-gray-300 rounded-lg">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Subreddits"
            className="w-96 h-12 px-4 text-lg" // Increased width, height, and font size
        />
        <div className="border-l h-8 border-gray-300 mx-2"></div> {/* Vertical line */}
        <button type="submit" className="pr-4" >
            <CiSearch size="30" />
        </button>
    </form>

          </div>

            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {results.length > 0 && (
                <div className='mt-4'>
                    {results.map((subreddit, index) => (
                        <div key={index}> <SRow subreddit={subreddit} /> </div>
                    ))}
                </div>
            )}
             <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport} />

        </div>
    );
}

export default SubredditSearch;