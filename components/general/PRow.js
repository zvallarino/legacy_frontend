import React from "react";

function Prow({ post }) {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col justify-center mb-4" style={{ width: '600px', maxWidth: '100%' }}>
        <div className="flex mb-2  w-full justify-between">
            <div>{post.subreddit}</div>
            <div className="mr-2 flex justify-center items-center" style={{ width: '25px', height: '25px' }}>
            </div>
            <div className="flex flex-col justify-center">
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

export default Prow;