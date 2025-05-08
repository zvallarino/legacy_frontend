"use client";

import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import * as XLSX from 'xlsx';

function IncrementalSubredditSearch({ time, typeList }) { // Added time prop
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(50); // Sensible default maybe higher?
  const [intervalTime, setIntervalTime] = useState(5000); // 5 seconds default
  // --- NEW: Max Loops State ---
  const [maxLoops, setMaxLoops] = useState(5); // Default to 5 loops

  const [activeSearches, setActiveSearches] = useState([]);

  const limitOptions = [10, 20, 30, 50, 100, 300, 500, 1000]; // Added 500
  const intervalOptions = [
      { label: '2 sec', value: 2000 },
      { label: '5 sec', value: 5000 },
      { label: '10 sec', value: 10000 },
      { label: '30 sec', value: 30000 },
      { label: '1 min', value: 60000 },
     // { label: '24 hrs', value: 86400000 } // Be careful with very long intervals/durations
  ];
  // --- NEW: Max Loops Options ---
  const maxLoopsOptions = [
      { label: '1 Batch', value: 1 },
      { label: '5 Batches', value: 5 },
      { label: '10 Batches', value: 10 },
      { label: '20 Batches', value: 20 },
      { label: '50 Batches', value: 50 },
      // { label: 'Unlimited', value: 0 }, // Option for unlimited
  ];


  const initiateSearch = async (searchQuery) => {
      const searchId = Date.now(); // Use a more robust unique ID if needed

      // Calculate estimated total posts for user feedback (optional)
      const estimatedPosts = maxLoops > 0 ? limit * maxLoops : 'Unlimited';

      setActiveSearches(prev => [
          ...prev,
          {
              id: searchId,
              query: searchQuery,
              isLoading: true,
              posts: [],
              progress: 'Initiating...', // Initial status
              statusDetail: `Workspaceing ${limit} posts every ${intervalTime/1000}s, max ${maxLoops > 0 ? maxLoops : 'unlimited'} batches. (Est. ${estimatedPosts} posts)`,
              requestId: null,
              intervalId: null // Renamed from 'interval' to avoid conflict
          }
      ]);

      try {
          // --- UPDATED: Add max_loops, time, and list type to API call ---
          const apiUrl = `http://127.0.0.1:8000/search_app/reddit/incremental/?q=${encodeURIComponent(searchQuery)}&limit=${limit}&interval=${intervalTime}&max_loops=${maxLoops}&list=${typeList}&t=${time}`;

          const response = await fetch(apiUrl);

          if (!response.ok) {
               const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' })); // Catch potential JSON parsing errors
               throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.request_id) {
              setActiveSearches(prev =>
                  prev.map(s => s.id === searchId ? { ...s, requestId: data.request_id, progress: data.status || 'Scheduled' } : s)
              );

              // Start polling
              const pollId = setInterval(() => checkStatus(searchId, data.request_id), intervalTime); // Poll at the user-specified interval

              setActiveSearches(prev =>
                  prev.map(s => s.id === searchId ? { ...s, intervalId: pollId } : s)
              );
          } else {
               throw new Error(data.error || 'Failed to initiate search. No request_id received.');
          }
      } catch (error) {
           console.error("Initiation Error:", error);
           // Update the specific search state to show the error
           setActiveSearches(prev =>
               prev.map(s => s.id === searchId ? {
                   ...s,
                   isLoading: false,
                   progress: `Error: ${error.message}`,
                   statusDetail: 'Failed to start search.'
               } : s)
           );
      }
  };

  const checkStatus = async (searchId, requestId) => {
      try {
          // Added include_partial=true to potentially get results sooner
          const statusUrl = `http://127.0.0.1:8000/search_app/reddit/incremental/status/?id=${requestId}&include_partial=true`;
          const response = await fetch(statusUrl);

           if (!response.ok) {
               const errorData = await response.json().catch(() => ({ error: 'Unknown error checking status' }));
               // Don't stop polling on transient errors, maybe log them
               console.error(`Status check failed for ${requestId}: ${errorData.error || response.status}`);
               // Optionally update UI slightly:
               // setActiveSearches(prev => prev.map(s => s.id === searchId ? { ...s, progress: 'Status check error...' } : s));
               return; // Don't proceed further on error
           }

          const data = await response.json();

          let isComplete = data.status === "Complete";
          let currentProgress = data.progress || (isComplete ? '100%' : 'Processing...'); // Use progress if available
          let currentStatusDetail = data.status_detail || ''; // Get detailed status if backend provides it

           // Find the search entry *before* potential state update clears intervalId
          const currentSearch = activeSearches.find(s => s.id === searchId);


          setActiveSearches(prev =>
              prev.map(s => {
                  if (s.id === searchId) {
                      return {
                          ...s,
                          posts: data.results || s.posts, // Keep old posts if results aren't sent or empty
                          progress: currentProgress,
                          statusDetail: currentStatusDetail || s.statusDetail, // Update detail if provided
                          isLoading: !isComplete // isLoading is true if not complete
                      };
                  }
                  return s;
              })
          );

          // Clear interval ONLY if complete AND the intervalId exists
          if (isComplete && currentSearch?.intervalId) {
               console.log(`Search ${searchId} complete, clearing interval ${currentSearch.intervalId}`);
              clearInterval(currentSearch.intervalId);
               // Ensure intervalId is cleared in state too, preventing double clears
               setActiveSearches(prev => prev.map(s => s.id === searchId ? { ...s, intervalId: null } : s));
          }
       } catch (error) {
          console.error("Status Check Error:", error);
          // Potentially stop polling if a critical error occurs, or just log
           // Maybe find the search and clear its interval?
           const searchWithError = activeSearches.find(s => s.id === searchId);
           if(searchWithError?.intervalId) {
              clearInterval(searchWithError.intervalId);
              setActiveSearches(prev => prev.map(s => s.id === searchId ? { ...s, isLoading: false, progress: `Polling Error: ${error.message}`, intervalId: null } : s));
           }
      }
  };

  const exportToExcel = (searchQuery, posts) => {
      // Ensure posts is an array and has data
       if (!Array.isArray(posts) || posts.length === 0) {
          alert("No data available to export.");
          return;
       }
      const ws = XLSX.utils.json_to_sheet(posts);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Subreddit Data");

      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;

      XLSX.writeFile(wb, `${searchQuery}_${formattedDate}.xlsx`);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (query) {
          initiateSearch(query);
          // Don't clear query here, user might want to adjust params and re-run
          // setQuery('');
      }
  };

  // Function to cancel a specific search
   const cancelSearch = (searchId) => {
       const searchToCancel = activeSearches.find(s => s.id === searchId);
       if (searchToCancel?.intervalId) {
           clearInterval(searchToCancel.intervalId);
       }
       // Optionally: Send a request to the backend to stop the task if possible
       // fetch(`http://127.0.0.1:8000/search_app/reddit/incremental/cancel/?id=${searchToCancel.requestId}`);

       setActiveSearches(prev => prev.filter(s => s.id !== searchId)); // Remove from active list
   };


  return (
      <div className="container mx-auto px-4">
          {/* Search Form */}
          <div className="flex justify-center mb-6">
              <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 border-2 border-gray-300 rounded-lg p-2">
                  <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter subreddit name (no 'r/')"
                      className="w-60 h-12 px-4 text-lg border rounded" // Added border
                      required // Make subreddit input required
                  />
                   {/* Posts per Batch */}
                   <div className="flex items-center gap-1">
                       <label htmlFor="limitSelect" className="text-sm">Posts/Batch:</label>
                      <select id="limitSelect" value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="h-12 px-2 border rounded">
                          {limitOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                  </div>
                   {/* Interval */}
                   <div className="flex items-center gap-1">
                       <label htmlFor="intervalSelect" className="text-sm">Interval:</label>
                      <select id="intervalSelect" value={intervalTime} onChange={(e) => setIntervalTime(Number(e.target.value))} className="h-12 px-2 border rounded">
                          {intervalOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                  </div>
                  {/* --- NEW: Max Loops Select --- */}
                  <div className="flex items-center gap-1">
                       <label htmlFor="maxLoopsSelect" className="text-sm">Max Batches:</label>
                      <select id="maxLoopsSelect" value={maxLoops} onChange={(e) => setMaxLoops(Number(e.target.value))} className="h-12 px-2 border rounded">
                          {maxLoopsOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                   </div>
                  <button type="submit" className="h-12 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center">
                      <CiSearch size="24" /> {/* Adjusted size */}
                  </button>
              </form>
          </div>

           {/* Active Searches Display */}
           {activeSearches.length > 0 && (
               <div className="space-y-4">
                   {activeSearches.map(search => (
                       <div key={search.id} className="border rounded p-4 shadow">
                           <div className="flex justify-between items-start mb-2">
                               <div>
                                   <h3 className="font-bold text-lg">{search.query}</h3>
                                   <p className="text-sm text-gray-600">{search.statusDetail}</p>
                                   <p className={`text-sm font-medium ${search.isLoading && !search.progress.startsWith('Error') ? 'text-blue-600 animate-pulse' : (search.progress.startsWith('Error') ? 'text-red-600' : 'text-green-600')}`}>
                                        Status: {search.progress}
                                   </p>
                                </div>
                               <div className="flex flex-col items-end gap-2">
                                   {search.isLoading && (
                                       <button
                                           onClick={() => cancelSearch(search.id)}
                                           className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                           title="Stop fetching for this subreddit"
                                       >
                                           Cancel
                                       </button>
                                   )}
                                   {!search.isLoading && search.posts.length > 0 && (
                                       <button
                                           onClick={() => exportToExcel(search.query, search.posts)}
                                           className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                           title={`Download ${search.posts.length} posts`}
                                        >
                                           <FaDownload size="12"/> Download
                                       </button>
                                   )}
                                   {!search.isLoading && search.posts.length === 0 && !search.progress.startsWith('Error') && (
                                        <span className="text-sm text-gray-500">No posts found or returned.</span>
                                   )}
                               </div>
                           </div>


                       </div>
                   ))}
               </div>
           )}

      </div>
  );
}
export default IncrementalSubredditSearch;
