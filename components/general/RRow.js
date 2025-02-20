import React from "react";

function Rrow({ post }) {

    const truncateAbstract = (abstract) => {
        if (!abstract) return '';
        // Split by period, ensuring you trim whitespace.
        const sentences = abstract.split('.').map(s => s.trim()).filter(Boolean);
        if (sentences.length <= 2) {
          return abstract;
        }
        return sentences.slice(0, 2).join('. ') + '.';
      };

      
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col justify-center mb-4" style={{ width: '600px', maxWidth: '100%' }}>
        <div className="flex mb-2  w-full justify-between">
            <div>{post.journal_title}</div>
            <div className="mr-2 flex justify-center items-center" style={{ width: '25px', height: '25px' }}>
            </div>
            <div className="flex flex-col justify-center">
                <div>{post.first_author}</div>
                <div>{post.pub_date}</div> {/* Format the date */}
            </div>
        </div>

        <div className="mb-2">
            <a href={post.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div>{post.title}</div>
                </a>
            <div>{truncateAbstract(post.abstract)}</div>
        </div>

        <div className="flex">
            <div className="mr-4">Issue{post.issue} </div>
            <div>Volume {post.volume} </div>
        </div>
    </div>
  );
}

export default Rrow;