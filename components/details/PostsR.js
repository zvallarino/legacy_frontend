"use client"
import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
;
import RowsD from './RowsD';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import RowsPostR from './RowsPostR';

function PostsR({ subreddit }) {
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the top five posts when the component mounts and whenever the subreddit changes
        fetchTopPosts(subreddit);
    }, [subreddit]);

    const fetchTopPosts = async (subreddit) => {
        if (!subreddit) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/search_app/nih_research_short/?q=${subreddit}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setResults(data.results);
            console.log(data)
        } catch (error) {
            console.error('There was an error fetching the posts:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center mt-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
                    </div>
                ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : results.length > 0 ? (
                    <div className="w-full">
                        {results.map((post, index) => (
                            <div key={index} className="flex justify-center mb-4">
                                <RowsPostR post={post} />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default PostsR;