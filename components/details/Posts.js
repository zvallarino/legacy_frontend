"use client"
import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
;
import RowsD from './RowsD';

function PostDetail({ subreddit }) {
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
            const response = await fetch(`http://127.0.0.1:8000/top_posts/?subreddit=${subreddit}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('There was an error fetching the posts:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {results.length > 0 && (
                <div className="flex flex-col items-center">
                    {results.map((post, index) => (
                        <div key={index} className="w-full flex justify-center mb-4">
                            <RowsD post={post} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostDetail;