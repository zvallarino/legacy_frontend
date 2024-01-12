import React from "react";

function RowsD({ post }) {
  return (
    <div className="bg-white text-black p-4 shadow-lg rounded-lg flex flex-col justify-center mb-4" style={{ width: '600px', maxWidth: '100%' }}>
        <div className="flex mb-2">
            <div>{post.subreddit}</div>
            <div className="mr-2 flex justify-center items-center" style={{ width: '25px', height: '25px' }}>
                <img
                src={!post.icon_url || post.icon_url === "" ? "https://www.redditstatic.com/avatars/avatar_default_02_545452.png" : post.icon_url}
                alt="Subreddit Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
            <div className="flex flex-col justify-center">
                <div>Posted by {post.author}</div>
                <div>{new Date(post.created_utc * 1000).toLocaleString()}</div> {/* Format the date */}
            </div>
        </div>

        <div className="mb-2">
            <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div>{post.title}</div>
                </a>
        </div>

        <div className="flex">
            <div className="mr-4">{post.score} Upvotes</div>
            <div>{post.num_comments} comments</div>
        </div>
    </div>
  );
}

export default RowsD;