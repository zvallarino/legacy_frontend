import React from "react";

function Crow({ comment }) {
  return (
    <div className="bg-neutral-100 p-4 shadow-lg rounded-lg flex flex-col justify-center mb-4" style={{ width: '600px', maxWidth: '100%' }}>
        <div className="flex mb-2">
            <div>{comment.subreddit}</div>
            {/* Subreddit icon: assuming comment has subreddit icon URL */}
            <div className="mr-2 flex justify-center items-center" style={{ width: '25px', height: '25px' }}>
                <img
                src={!comment.subreddit_icon || comment.subreddit_icon === "" ? "https://www.redditstatic.com/avatars/avatar_default_02_545452.png" : comment.subreddit_icon}
                alt="Subreddit Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
            <div className="flex flex-col justify-center">
                <div>Commented by {comment.author}</div>
                <div>{new Date(comment.created_utc * 1000).toLocaleString()}</div> {/* Format the date */}
            </div>
        </div>

        <div className="mb-2 flex-col">
                <a href={comment.post_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div>{comment.post_title}</div>
                </a>
            {/* Displaying the comment text */}
            <div>{comment.text}</div>
            
        </div>

        <div className="flex">
            <div className="mr-4">{comment.score} Upvotes</div>
        </div>
    </div>
  );
}

export default Crow;