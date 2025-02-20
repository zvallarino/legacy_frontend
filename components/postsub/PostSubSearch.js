"use client"
import React, { useState } from 'react';
import { CiExport, CiSearch } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Popup from '../Search/Popup';
import * as XLSX from 'xlsx';
import { FaSearch } from "react-icons/fa";
import Prow from '../general/PRow';
// Make sure to import your Prow component if you need it.
// import Prow from './PRow';

function PostSubSearch({ time, typeList }) {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [allresults, setAllResults] = useState([]); // default to empty array

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const exportToExcel = () => {
    // Convert created_utc for Excel date formatting and remove 'author'
    const formattedResults = allresults.map(({ author, ...post }) => ({
      ...post,
      created_utc: (post.created_utc / 86400) + 25569
    }));
  
    // Truncate text to a maximum of 32767 characters per cell
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
  
    // Notice that the header array now does not include 'author'
    const ws = XLSX.utils.json_to_sheet(truncatedResults, {
      header: [
        "title", "selftext", "praw_id", "upvote_ratio", "view_count", "url",
        "permalink", "score", "category", "num_comments", "num_crossposts",
        "comment_limit", "num_reports", "domain", "is_self", "is_video",
        "media_only", "created_utc", "subreddit", "subreddit_icon",
        "over_18"
      ],
    });
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
  
    // Get current date for the filename
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')} ${String(currentDate.getDate()).padStart(2, '0')} ${currentDate.getFullYear()}`;
  
    const filename = `${query} ${formattedDate}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  const handleExport = (type) => {
    console.log(`Export type: ${type}`);
    exportToExcel();
    handlePopupClose();
  };

  const searchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Note: We're now including the "list" query parameter
      const response = await fetch(`http://127.0.0.1:8000/search_app/old_subreddit/?q=${query}&t=${time}&list=${typeList}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setAllResults(data.results || []);
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
               <div className="flex w-full">
  <div className="w-1/6"></div> {/* Left spacing */}
  <div className="w-4/6 my-2">
    {/* Center content */}
    <div className="flex flex-col">
      <div className="flex items-center">
        <FaSearch className="text-blue-900 text-4xl mr-2" />
        <div className="text-blue-900 text-4xl">Search</div>
      </div>
      <hr className="border-t-2 mb-2 mt-2 border-blue-950 rounded-full" />
    </div>
  </div>
  <div className="w-1/6"></div> {/* Right spacing */}
</div>

      <div className='flex justify-center'>
        
        {allresults.length > 0 && (
          <div
            className='flex items-center border-t-2 border-b-2 border-l-2 border-gray-300 rounded-l-lg justify-center px-2 hover:bg-green-600'
            onClick={() => setShowPopup(true)}
          >
            <CiExport size="30" className="mx-2" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center border-2 border-gray-300 rounded-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type in Subreddit Name"
            className="w-96 h-12 px-4 text-lg"
          />
          <div className="border-l h-8 border-gray-300 mx-2"></div>
          <button type="submit" className="pr-4">
            <CiSearch size="30" />
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : allresults.length > 0 ? (
          <div className="w-full">
            {allresults.map((subreddit, index) => (
              <div key={index} className="flex justify-center mb-4">
                <Prow post={subreddit} />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport} />
    </div>
  );
}

export default PostSubSearch;