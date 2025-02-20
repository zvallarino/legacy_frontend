"use client";
import React, { useState } from 'react';
import { CiExport, CiSearch } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Prow from './PRow';
import Popup from '../Search/Popup';
import * as XLSX from 'xlsx';
import Rrow from './RRow';

function Rsearch() {
  const [query, setQuery] = useState('');
  const [allResults, setAllResults] = useState([]); // Single state variable for results
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const exportToExcel = () => {
    // Truncate text to a maximum of 32767 characters per cell.
    // Also, if a value is an array, join it to a string.
    const truncatedResults = allResults.map(post => {
      const truncatedPost = {};
      for (const key in post) {
        if (typeof post[key] === 'string') {
          truncatedPost[key] = post[key].slice(0, 32767);
        } else if (Array.isArray(post[key])) {
          truncatedPost[key] = post[key].join(', ');
        } else {
          truncatedPost[key] = post[key];
        }
      }
      return truncatedPost;
    });
  
    // Specify the headers (and order) for the Excel file.
    const headers = [
      "title",
      "abstract",
      "first_author",
      "authors",
      "pmid",
      "doi",
      "journal_title",
      "journal_abbreviation",
      "volume",
      "issue",
      "pub_date",
      "pages",
      "language",
      "mesh_headings",
      "license",
      "citation",
      "link"
    ];
  
    // Create the worksheet and workbook.
    const ws = XLSX.utils.json_to_sheet(truncatedResults, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
  
    // Generate a filename using the query and current date.
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
      // Update the fetch URL to use the new endpoint
      const response = await fetch(`http://127.0.0.1:8000/search_app/nih_research/?q=${query}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Use the 'results' key returned by the new view
      setAllResults(data['results']);
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
      <div className="flex justify-center">
        {allResults.length > 0 && (
          <div
            className="flex items-center border-t-2 border-b-2 border-l-2 border-gray-300 rounded-l-lg justify-center px-2 hover:bg-green-600"
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
            placeholder="Search Posts"
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
        ) : allResults.length > 0 ? (
          <div className='flex w-full'>
            <div className='flex w-1/6'> </div>
            <div className='flex w-4/6'>
              <div className="w-full  grid grid-cols-1 lg:grid-cols-3 gap-2">
                {allResults.map((post, index) => (
                  <div key={index} className="flex justify-center mb-4">
                    <Rrow post={post} />
        
                  </div>
                ))}
              </div>
            </div>
            <div className='flex w-1/6'> </div>
          </div>
        ) : null}
      </div>

      <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport} />
    </div>
  );
}

export default Rsearch;
