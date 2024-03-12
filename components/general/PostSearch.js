"use client"
import React, { useState } from 'react';
import { CiExport, CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import Prow from './PRow';
import Popup from '../Search/Popup';
import * as XLSX from 'xlsx';

function PostSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [allresults, setAllResults ] = useState('');
    
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


    const searchPosts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/search_app/search_posts/?q=${query}`);
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
            placeholder="Search Posts"
            className="w-96 h-12 px-4 text-lg" // Increased width, height, and font size
        />
        <div className="border-l h-8 border-gray-300 mx-2"></div> {/* Vertical line */}
        <button type="submit" className="pr-4">
            <CiSearch size="30" />
        </button>
    </form>
          </div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {results.length > 0 && (
        <div className="flex flex-col items-center"> {/* Flex container to center children */}
            {results.map((subreddit, index) => (
                <div key={index} className="w-full flex justify-center mb-4"> {/* Wrapper to center each post */}
                    <Prow post={subreddit} />
                </div>
            ))}
        </div>
    )}
      <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport} />
        </div>
    );
}

export default PostSearch;