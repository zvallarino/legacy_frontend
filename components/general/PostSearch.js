"use client";
import React, { useState } from 'react';
import { CiExport, CiSearch } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Prow from './PRow';
import Popup from '../Search/Popup';
import * as XLSX from 'xlsx';

function PostSearch() {
  const [query, setQuery] = useState('');
  const [allResults, setAllResults] = useState([]); // Single state variable for results
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const exportToExcel = () => {
    // 1. Format the data: Convert created_utc for Excel and remove 'author'
    const formattedResults = allResults.map(({ author, ...post }) => ({
      ...post,
      created_utc: (post.created_utc / 86400) + 25569
    }));
  
    // 2. Truncate text fields
    const truncatedResults = formattedResults.map(post => {
      const truncatedPost = {};
      for (const key in post) {
        truncatedPost[key] =
          typeof post[key] === 'string' ? post[key].slice(0, 32767) : post[key];
      }
      return truncatedPost;
    });
  
    // 3. Create the "Data" worksheet with your original data.
    const dataSheet = XLSX.utils.json_to_sheet(truncatedResults, {
      header: [
        "title", "selftext", "praw_id", "upvote_ratio", "view_count", "url",
        "permalink", "score", "category", "num_comments", "num_crossposts",
        "comment_limit", "num_reports", "domain", "is_self", "is_video",
        "media_only", "created_utc", "subreddit", "subreddit_icon",
        "over_18"
      ],
    });
  
    // 4. Aggregate subreddit counts.
    const subredditCounts = {};
    truncatedResults.forEach(post => {
      const subreddit = post.subreddit || 'Unknown';
      subredditCounts[subreddit] = (subredditCounts[subreddit] || 0) + 1;
    });
    const aggregatedData = Object.keys(subredditCounts)
      .map(subreddit => ({
        subreddit,
        count: subredditCounts[subreddit]
      }))
      .sort((a, b) => b.count - a.count);
  
    // 5. Create a worksheet for the full aggregated data.
    const aggregatedSheet = XLSX.utils.json_to_sheet(aggregatedData, {
      header: ["subreddit", "count"],
    });
  
    // 6. Prepare the chart data: top 15 rows, with the remainder grouped as "Other"
    let top15 = aggregatedData.slice(0, 15);
    const otherCount = aggregatedData
      .slice(15)
      .reduce((sum, item) => sum + item.count, 0);
    if (otherCount > 0) {
      top15.push({ subreddit: 'Other', count: otherCount });
    }
    // Optionally, you might calculate percentages:
    const totalCount = top15.reduce((sum, item) => sum + item.count, 0);
    const chartData = top15.map(item => ({
      subreddit: item.subreddit,
      count: item.count,
      percentage: ((item.count / totalCount) * 100).toFixed(2)
    }));
  
    // 7. Create a worksheet for the chart data.
    // We'll include the percentage for clarity.
    const chartDataSheet = XLSX.utils.json_to_sheet(chartData, {
      header: ["subreddit", "count", "percentage"],
    });
  
    // 8. Assemble the workbook with three sheets:
    //    - "Data" for the original posts,
    //    - "Subreddit Counts" for full aggregated counts,
    //    - "Chart Data" for the pie chart table.
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, dataSheet, "Data");
    XLSX.utils.book_append_sheet(wb, aggregatedSheet, "Subreddit Counts");
    XLSX.utils.book_append_sheet(wb, chartDataSheet, "Chart Data");
  
    // 9. (Optional) If you wanted to get fancy and place the chart data next to the aggregated table
    //    in the same sheet, you’d need to merge ranges and adjust cell positions manually.
    //    However, SheetJS does not support adding native chart objects.
  
    // 10. Write the workbook to a file.
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}-${currentDate.getFullYear()}`;
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
      const response = await fetch(`http://127.0.0.1:8000/search_app/old_reddit_search/?q=${query}`);
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
          <div className="w-full">
            {allResults.map((post, index) => (
              <div key={index} className="flex justify-center mb-4">
                <Prow post={post} />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <Popup show={showPopup} onClose={handlePopupClose} onExport={handleExport} />
    </div>
  );
}

export default PostSearch;
