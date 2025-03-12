"use client";

import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import * as XLSX from 'xlsx';

function IncrementalSubredditSearch({ typeList }) {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [intervalTime, setIntervalTime] = useState(2000);
  const [activeSearches, setActiveSearches] = useState([]);

  const limitOptions = [10, 20, 30, 50, 100, 300, 1000];
  const intervalOptions = [
    { label: '2 sec', value: 2000 },
    { label: '5 sec', value: 5000 },
    { label: '10 sec', value: 10000 },
    { label: '30 sec', value: 30000 },
    { label: '1 min', value: 60000 },
    { label: '24 hrs', value: 86400000 }
  ];

  const initiateSearch = async (searchQuery) => {
    const searchId = Date.now();

    setActiveSearches(prev => [
      ...prev,
      { id: searchId, query: searchQuery, isLoading: true, posts: [], progress: '0%', requestId: null, interval: null }
    ]);

    // Pass the selected limit and intervalTime in the query string.
    const response = await fetch(
      `http://127.0.0.1:8000/search_app/reddit/incremental/?q=${searchQuery}&limit=${limit}&interval=${intervalTime}&list=${typeList}`
    );
    const data = await response.json();

    if (data.request_id) {
      setActiveSearches(prev =>
        prev.map(s => s.id === searchId ? { ...s, requestId: data.request_id } : s)
      );

      // Use the user-selected intervalTime for polling the status.
      const pollInterval = setInterval(() => checkStatus(searchId, data.request_id), intervalTime);

      setActiveSearches(prev =>
        prev.map(s => s.id === searchId ? { ...s, interval: pollInterval } : s)
      );
    }
  };

  const checkStatus = async (searchId, requestId) => {
    const response = await fetch(
      `http://127.0.0.1:8000/search_app/reddit/incremental/status/?id=${requestId}&include_partial=true`
    );
    const data = await response.json();

    setActiveSearches(prev =>
      prev.map(s => {
        if (s.id === searchId) {
          return {
            ...s,
            posts: data.results,
            progress: data.progress,
            isLoading: data.status !== "Complete"
          };
        }
        return s;
      })
    );

    if (data.status === "Complete") {
      const search = activeSearches.find(s => s.id === searchId);
      if (search?.interval) clearInterval(search.interval);
    }
  };

  const exportToExcel = (searchQuery, posts) => {
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
      setQuery('');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter subreddit name"
            className="w-80 h-12 px-4 text-lg"
          />
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="h-12 px-2">
            {limitOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={intervalTime} onChange={(e) => setIntervalTime(Number(e.target.value))} className="h-12 px-2">
            {intervalOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <button type="submit" className="pr-4">
            <CiSearch size="30" />
          </button>
        </form>
      </div>

      {activeSearches.map(search => (
        <div key={search.id} className="flex flex-col items-center mb-4">
          <div className="text-gray-700 mb-2">
            {search.isLoading ? `${search.query} - Loading... ${search.progress}` : `${search.query} - Complete!`}
          </div>

          {!search.isLoading && search.posts.length > 0 && (
            <button
              onClick={() => exportToExcel(search.query, search.posts)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <FaDownload /> {search.query} - Download Results
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default IncrementalSubredditSearch;
