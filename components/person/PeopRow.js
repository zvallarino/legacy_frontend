import React from "react";

function PeopRow({ person }) {
  return (
    <div className="bg-neutral-100 p-4 shadow-lg rounded-lg flex flex-col justify-center mb-4" style={{ width: '600px', maxWidth: '100%' }}>
        <div className="flex mb-2">
            <div className="mr-2 flex justify-center items-center" style={{ width: '25px', height: '25px' }}>
                <img
                src={!person.icon_img || person.icon_img === "" ? "https://www.redditstatic.com/avatars/avatar_default_02_545452.png" : person.icon_img}
                alt="User Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
            <div className="flex flex-col justify-center">
            <a href={`https://www.reddit.com/user/${person.username}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div>{person.username}</div>
                </a>
                <div>Link Karma: {person.link_karma}</div>
                <div>Comment Karma: {person.comment_karma}</div>
            </div>
        </div>

      
    </div>
  );
}

export default PeopRow;
