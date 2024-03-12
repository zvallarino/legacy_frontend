"use client"
import React, { useState } from 'react';
import { CiExport, CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import Trow from './TRow';
import Popup from '../Search/Popup';
import * as XLSX from 'xlsx';

function TimeSearch() {
    const [query, setQuery] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [allresults, setAllResults ] = useState('');
    const [showTimeInputs, setShowTimeInputs] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeToRun, setTimeToRun] = useState('30 s');
    const [numThreads, setNumThreads] = useState('1');
    
    const handlePopupClose = () => {
        setShowPopup(false);
      };

      const exportToExcel = () => {

        const formattedResults = allresults.map(post => ({
            ...post,
            created_utc: (post.created_utc / 86400) + 25569 // Format as 'YYYY-MM-DD HH:MM:SS'
          }));
        // Truncate text to a maximum of 32767 characters
        const truncatedResults = formattedResults.map(post => {
          const truncatedPost = {};
          for (const key in post) {
            if (typeof post[key] === 'string') {
              truncatedPost[key] = post[key].slice(0, 32767);
            } else {
              truncatedPost[key] = post[key];
            }
          }
          return truncatedPost;
        });

        
      
        const ws = XLSX.utils.json_to_sheet(truncatedResults, {
          header: ["title", "selftext", "praw_id", "upvote_ratio", "view_count", "url", "permalink", 'score', "category", 'num_comments', 'num_crossposts', "comment_limit", "num_reports", "domain", "is_self", "is_video", "media_only", 'created_utc','author', 'subreddit','subreddit_icon', "over_18"],
        });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
      
        XLSX.writeFile(wb, "exported_data.xlsx");
      };

    
      const handleExport = (type) => {
        console.log(`Export type: ${type}`);
        exportToExcel()
        handlePopupClose();
      };

      const toggleTimeInputs = (e) => {
        e.preventDefault();
        setShowTimeInputs(!showTimeInputs);
      };
      

    const searchPosts = async () => {
        setLoading(true);
        setError(null);

        let url = `http://127.0.0.1:8000/search_app/search_subreddit/?q=${query}&subreddit=${subTitle}`;

        if (showTimeInputs) {
            url = `http://127.0.0.1:8000/search_app/search_time/?q=${query}&subreddit=${subTitle}&start_date=${startTime}&end_date=${endTime}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setResults(data['results_show']);
            setAllResults(data['results_all']);
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
            searchPosts();
        }
    };

    return (
      <div>
          <div className='flex justify-center'>
              {results.length > 0 && (
                  <div className='flex items-center border-t-2 border-b-2 border-l-2 border-gray-300 rounded-l-lg justify-center px-2 hover:bg-green-600' onClick={() => setShowPopup(true)}>
                      <CiExport size="30" className="mx-2" /> {/* Icon */}
                  </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col items-center border-2 border-gray-300 rounded-lg p-4">
                  <input
                      type="text"
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      placeholder="Enter Subreddit"
                      className="w-full h-12 px-4 text-lg mb-4"
                  />
                  <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search Posts"
                      className="w-full h-12 px-4 text-lg mb-4"
                  />
                   <button onClick={toggleTimeInputs} className="px-4 py-2 bg-green-500 text-white rounded-lg mb-4">
        {showTimeInputs ? 'Hide Time' : 'Add Time'}
    </button>
                              {showTimeInputs && (
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        placeholder="Start Date (YYYY-MM-DD)"
                        className="w-1/2 h-12 px-4 text-lg mr-2"
                    />
                    <input
                        type="text"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        placeholder="End Date (YYYY-MM-DD)"
                        className="w-1/2 h-12 px-4 text-lg"
                    />
                </div>
            )}

<div className="flex justify-center mb-4">
    <div className="w-1/2 mr-2">
        <label className="block text-lg mb-2">Time to Run</label>
        <select
            value={timeToRun}
            onChange={(e) => setTimeToRun(e.target.value)}
            className="w-full h-12 px-4 text-lg"
        >
            <option value="30 seconds">30 s</option>
            <option value="1 minute">1 minute</option>
            <option value="10 minutes">10 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="4 hours">4 hours</option>
            <option value="8 hours">8 hours</option>
            <option value="24 hours">24 hours</option>
        </select>
    </div>
    <div className="w-1/2">
        <label className="block text-lg mb-2"># of Threads</label>
        <select
            value={numThreads}
            onChange={(e) => setNumThreads(e.target.value)}
            className="w-full h-12 px-4 text-lg"
        >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
        </select>
    </div>
</div>
                  
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                      <CiSearch size="30" />
                  </button>
              </form>
          </div>
          {isLoading ? (
      <div className="flex justify-center items-center mt-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : error ? (
      <div className="text-center text-red-500 mt-8">Error: {error}</div>
    ) : results.length > 0 ? (
      <div className="flex flex-col items-center">
        {results.map((subreddit, index) => (
          <div key={index} className="w-full flex justify-center mb-4">
            <Trow post={subreddit} />
          </div>
        ))}
      </div>
    ) : null}
    <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport} />
  </div>  );
}

export default TimeSearch;