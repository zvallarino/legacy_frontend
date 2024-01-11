import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import PeopRow from './PeopRow';

function PersonSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/person/?usernames=${query}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setResults(data);
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
            searchUsers();
        }
    };

    return (
        <div>
          <div className='flex justify-center'>
            <form onSubmit={handleSubmit} className="flex items-center border-2 border-gray-300 rounded-lg">
              <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search People"
                  className="w-96 h-12 px-4 text-lg"
              />
              <div className="border-l h-8 border-gray-300 mx-2"></div>
              <button type="submit" className="pr-4">
                  <CiSearch size="30" />
              </button>
            </form>
          </div>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {results.length > 0 && (
              <div className="flex flex-col items-center">
                  {results.map((person, index) => (
                      <div key={index} className="w-full flex justify-center mb-4">
                          <PeopRow person={person} />
                      </div>
                  ))}
              </div>
          )}
        </div>
    );
}

export default PersonSearch;