"use client"
import React, { useState, useEffect } from 'react';
import { CiExport, CiSearch } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSearch, FaDownload } from "react-icons/fa";
import * as XLSX from 'xlsx';
import Prow from '../general/PRow';

function IncrementalSubredditSearch({ time, typeList }) {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [progress, setProgress] = useState('0%');
  const [posts, setPosts] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [pollInterval, setPollInterval] = useState(null);

  const exportToExcel = () => {
    // Format results for Excel export
    const formattedResults = posts.map(({ author, ...post }) => ({
      ...post,
      created_utc: (post.created_utc / 86400) + 25569
    }));
  
    // Truncate text to stay within Excel limits
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
  
    // Create worksheet and export
    const ws = XLSX.utils.json_to_sheet(truncatedResults);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subreddit Data");
  
    // Format date for filename
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}-${currentDate.getFullYear()}`;
  
    const filename = `${query}_${formattedDate}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  // Start incremental search
  const initiateSearch = async () => {
    setLoading(true);
    setError(null);
    setIsComplete(false);
    setPosts([]);
    
    // Clear any existing polling
    if (pollInterval) {
      clearInterval(pollInterval);
      setPollInterval(null);
    }

    try {
      // Initial request to start the incremental search
      const response = await fetch(
        `http://127.0.0.1:8000/search_app/reddit/incremental/?q=${query}&t=${time}&list=${typeList}`
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.request_id) {
        setRequestId(data.request_id);
        
        // Set up polling for status updates
        const interval = setInterval(() => {
          checkStatus(data.request_id);
        }, 2000);
        
        setPollInterval(interval);
      } else {
        throw new Error('No request ID returned from server');
      }
    } catch (error) {
      console.error('Error initiating search:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Check status of the incremental search
  const checkStatus = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search_app/reddit/incremental/status/?id=${id}&include_partial=true`
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      setProgress(data.progress);
      setPosts(data.results || []);
      
      if (data.status === "Complete") {
        setIsComplete(true);
        setLoading(false);
        
        // Clear polling interval
        if (pollInterval) {
          clearInterval(pollInterval);
          setPollInterval(null);
        }
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setError(error.message);
      setLoading(false);
      
      // Clear polling interval on error
      if (pollInterval) {
        clearInterval(pollInterval);
        setPollInterval(null);
      }
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [pollInterval]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      initiateSearch();
    }
  };

  // Calculate loading progress width
  const getProgressWidth = () => {
    if (!progress) return '0%';
    
    // Extract numbers from progress string (e.g., "1/3 batches" -> 33%)
    const match = progress.match(/(\d+)\/(\d+)/);
    if (match && match.length === 3) {
      const [_, completed, total] = match;
      return `${(parseInt(completed) / parseInt(total)) * 100}%`;
    }
    
    return '0%';
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search header */}
      <div className="flex w-full mb-6">
        <div className="w-1/6"></div>
        <div className="w-4/6 my-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              <FaSearch className="text-blue-900 text-4xl mr-2" />
              <div className="text-blue-900 text-4xl">Incremental Search</div>
            </div>
            <hr className="border-t-2 mb-2 mt-2 border-blue-950 rounded-full" />
          </div>
        </div>
        <div className="w-1/6"></div>
      </div>

      {/* Search bar and controls */}
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSubmit} className="flex items-center border-2 border-gray-300 rounded-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter subreddit name"
            className="w-96 h-12 px-4 text-lg"
          />
          <div className="border-l h-8 border-gray-300 mx-2"></div>
          <button type="submit" className="pr-4" disabled={isLoading}>
            <CiSearch size="30" />
          </button>
        </form>
      </div>

      {/* Loading and status area */}
      {isLoading && (
        <div className="flex flex-col items-center mb-6">
          <div className="mb-2 text-gray-700">
            {isComplete ? 'Search complete!' : `Loading... ${progress}`}
          </div>
          
          <div className="h-4 w-96 bg-gray-200 rounded-full">
            <div 
              className="h-4 bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: getProgressWidth() }}
            ></div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-center mb-6">
          Error: {error}
        </div>
      )}

      {/* Download button */}
      {isComplete && posts.length > 0 && (
        <div className="flex justify-center mb-6">
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaDownload /> Download Results
          </button>
        </div>
      )}

      {/* Results display */}
      {posts.length > 0 && (
        <div className="w-full">
          {posts.map((post, index) => (
            <div key={index} className="flex justify-center mb-4">
              <Prow post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IncrementalSubredditSearch;