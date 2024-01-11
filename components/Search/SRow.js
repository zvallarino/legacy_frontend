import Image from "next/image";
import React from "react";

function SRow({ subreddit }) {
  return (
    <div className="bg-neutral-100 flex justify-center">
      <div
        className="flex border-2 p-4 rounded-lg bg-white shadow-md"
        style={{ width: "500px", height: "150px", overflow: "hidden" }}
      >
        <div className="h-full flex justify-center items-center">
            <div className=" flex justify-center items-center" style={{ width: '75px', height: '75px' }}> {/* Adjusted for centering */}
              <img
                src={
                  !subreddit.icon_url || subreddit.icon_url === ""
                    ? "https://www.redditstatic.com/avatars/avatar_default_02_545452.png"
                    : subreddit.icon_url
                }
                alt="Subreddit Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Using objectFit 'contain' for aspect ratio
              />
        </div>
        </div>
        <div className="flex-col ml-4">
          <div className="flex items-center mb-2">
            <a href={`https://www.reddit.com/r/${subreddit.name}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div>{subreddit.name}</div>
                </a>
            <span className="mx-2 text-lg">·</span>
            {subreddit.subscribers.toLocaleString()}
          </div>
          <div>{subreddit.description}</div>
        </div>
      </div>
    </div>
  );
}
export default SRow;