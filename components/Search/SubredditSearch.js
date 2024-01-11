"use client"
import React, { useState } from 'react';
import SRow from './SRow';
import { CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";

function SubredditSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
          <form onSubmit={handleSubmit} className="flex items-center border-2 border-gray-300 rounded-lg">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Subreddits"
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
                <div>
                    {results.map((subreddit, index) => (
                        <div key={index}> <SRow subreddit={subreddit} /> </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SubredditSearch;