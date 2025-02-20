import React from "react";

function RowsPostR({ post }) {

  return (
    <div className="bg-white text-black p-4 shadow-lg rounded-lg flex flex-col justify-center mb-4" style={{ width: '600px', maxWidth: '100%' }}>
        <div className="flex mb-2">
            <div>{post.subreddit}</div>
            <div className="mr-2 flex justify-center items-center" style={{ width: '25px', height: '25px' }}>
           
            </div>
            <div className="flex flex-col justify-center">
            <a href={post.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>

                <div>Author:{post.first_author}</div>
                </a>

            </div>
        </div>

        <div className="mb-2">
            <a href={post.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div>{post.title}</div>
                </a>
        </div>

        <div className="flex">
            <div className="mr-4">{post.journal_title}</div>
            <div>{post.pub_date} </div>
        </div>
    </div>
  );
}

export default RowsPostR;