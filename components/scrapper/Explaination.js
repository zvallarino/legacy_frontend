// import React from "react";

// function Explaination() {
//   return (
//     <div className=" h-1/5 ">
//       <div className=" flex-col">
//         <div className=" items-center justify-center text-center text-3xl  text-black">
//           <div className="bg-neutral-100 flex justify-center">
//             <div className="p-4 bg-white rounded-md shadow-md ">
//               Overview and Usage
//             </div>
//           </div>
//         </div>
// <div className="flex bg-neutral-100">
//           <div className="bg-white rounded-md shadow-md mx-4 mt-2 px-4 py-2 w-1/3">
//             <div className=" bg-white">
//               <div className="text-black text-2xl  ">
//                 What is a Social Media Scraper?
//               </div>
//               <hr />
//               <div className="flex-col ">
//                 <div className="text-black">
//                   A social media scraper is a tool designed to automatically
//                   collect data from various social media platforms. It is
//                   typically used for gathering large amounts of information like
//                   posts, comments, user profiles, and other publically available
//                   data.
//                 </div>
//                 <div className="text-black">
//                   This tool is used for market research, brand monitoring,
//                   sentiment analysis, and other data-driven tasks.
//                 </div>
//               </div>
//             </div>
//           </div>
  
//           <div className="flex">
//             <div className="bg-white rounded-md shadow-md mx-4 mt-2 px-4 py-2">
//               <h2 className="text-black  text-2xl">
//                 How to Use the Social Media Scraper?
//               </h2>
//               <hr />
//               <h3 className="text-black font-bold  italic">
//                 Step 1: Select the social media platform you want to scrape
//               </h3>
//               <p className="text-black ">
//                 Currently, we support Facebook, Instagram, and Twitter. Select the
//                 platform you want to scrape from the dropdown menu.
//               </p>
  
//               <h3 className="text-black font-bold  italic">
//                 Step 2: Enter the social media handle you want to scrape
//               </h3>
//               <p className="text-black ">
//                 Enter the social media handle you want to scrape.{" "}
//               </p>
//               <p className="text-black ">
//                 For example, if you want to scrape the Facebook page of Population
//                 Council, enter “PopulationCouncil” in the text box.
//               </p>
  
//               <h3 className="text-black font-bold  italic">
//                 Step 3: Select the date range you want to scrape
//               </h3>
//               <p className="text-black ">
//                 Enter the start and end dates for the date range you want to
//                 scrape. The date range must be within the last 30 days.
//               </p>
  
//               <h3 className="text-black font-bold  italic">
//                 Step 4: Click the “Social Media” you would like to scrape
//               </h3>
//             </div>
  
//             <div className="flex-col bg-white rounded-md shadow-md mx-4 mt-2 px-4 py-2">
//               <div className="flex">
//                 <h2 className="text-black  text-2xl">Important Points:</h2>
               
//               </div>
//               <hr />
//               <h3 className="text-black font-bold  italic">Documentation</h3>
//               <p className="text-black">
//                 For Additional information on how to use the social media scraper,
//                 please refer to the documentation.
//                 <p>
//                   <a
//                     href="https://github.com/Population-Council/generalscrapper"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
//                   >
//                     Github
//                   </a>
//                 </p>
//               </p>
  
//               <h3 className="text-black font-bold  italic">Contact Support</h3>
//               <p className="text-black">
//                 For support or inquiries, please reach out to our IT department.
//                 <p>
//                   <a
//                     href="mailto:zvallarino@popcouncil.org"
//                     className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
//                   >
//                     zvallarino@popcouncil.org
//                   </a>
//                 </p>
//                 <p>
//                   <a
//                     href="mailto:csavel@popcouncil.org"
//                     className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
//                   >
//                     csavel@popcouncil.org
//                   </a>
//                 </p>
//               </p>
//             </div>
// </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Explaination;

import React from "react";

function Explanation() {
  return (
    <div className="h-1/5">
      <div className="flex flex-col">
        <div className="bg-nuetral-100 flex justify-center my-4">
          <div className="p-4 bg-white rounded-md shadow-md text-3xl text-black">
            Overview and Usage
          </div>
        </div>

        <div className="flex bg-nuetral-100">
          <div className="bg-white rounded-md shadow-md mx-4 mt-2 px-4 py-2 w-1/3">
            <h2 className="text-2xl text-black">What is a Social Media Scraper?</h2>
            <hr />
            <p className="text-black">
              A social media scraper is a tool designed to automatically
              collect data from various social media platforms. It is
              typically used for gathering large amounts of information like
              posts, comments, user profiles, and other publicly available data.
            </p>
            <p className="text-black">
              This tool is used for market research, brand monitoring,
              sentiment analysis, and other data-driven tasks.
            </p>
          </div>

          <div className="bg-white rounded-md shadow-md mx-4 mt-2 px-4 py-2">
            <div className="text-2xl text-black">How to Use the Social Media Scraper?</div>
            <hr />
            <div>
              <div className="italic font-bold text-black">Step 1: Select the social media platform you want to scrape</div>
              <div className=" text-black">Currently, we support Facebook, Instagram, and Twitter. Select the
                platform you want to scrape from the dropdown menu.</div>

              <div div className="italic font-bold text-black">Step 2: Enter the social media handle you want to scrape</div>
<div className=" text-black">Enter the social media handle you want to scrape. For example, if you want to scrape the Facebook page of Population Council, enter “PopulationCouncil” in the text box.</div>
<div div className="italic font-bold text-black">Step 3: Select the date range you want to scrape</div>
          <div className=" text-black">Enter the start and end dates for the date range you want to scrape. The date range must be within the last 30 days.</div>

          <div div className="italic font-bold text-black">Step 4: Click the “Scrape” button</div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-md mx-4 mt-2 px-4 py-2">
        <div className="text-2xl text-black">Important Points:</div>
        <hr />
        <div >
          <div className="italic font-bold text-black">Documentation</div>
          <div className=" text-black">For Additional information on how to use the social media scraper,
            please refer to the documentation on <a
              href="https://github.com/Population-Council/generalscrapper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              Github
            </a>.
          </div>

          <div className="italic font-bold text-black">Contact Support</div>
          <div className="italic text-black">For support or inquiries, please reach out to our IT department at <a
              href="mailto:zvallarino@popcouncil.org"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              zvallarino@popcouncil.org
            </a> or <a
              href="mailto:csavel@popcouncil.org"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              csavel@popcouncil.org</a>.</div>
</div>
</div>
</div>
</div>
</div>
);
}

export default Explanation;