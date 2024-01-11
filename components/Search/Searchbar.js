"use client"

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        console.log('Searching for:', searchTerm);
        // Call the Django API
        const response = await fetch(`http://localhost:8000/webs/ss3n?query=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        onSearch(data.results); // Pass the results back to the parent component
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>
                <FiSearch />
            </button>
        </div>
    );
}

export default SearchBar;