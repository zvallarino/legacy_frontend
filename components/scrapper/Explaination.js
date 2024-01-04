import React from "react";

function Explaination() {
  return (
    <div>
      <div className="logo">{/* Add your logo here */}</div>
      <div className="title">
        <h1>Social Media Scraper: Overview and Usage</h1>
      </div>

      <div>
        <h2>What is a Social Media Scraper?</h2>
        <p>A social media scraper is a tool designed to automatically collect data from various social media platforms. It is typically used for gathering large amounts of information like posts, comments, user profiles, and other publically available data. This tool is invaluable for market research, brand monitoring, sentiment analysis, and other data-driven tasks.</p>
    </div>

    <div>
        <h2>How to Use the Social Media Scraper?</h2>
        
        <h3>Step 1: Select the social media platform you want to scrape</h3>
        <p>Currently, we support Facebook, Instagram, and Twitter. Select the platform you want to scrape from the dropdown menu.</p>

        <h3>Step 2: Enter the social media handle you want to scrape</h3>
        <p>Enter the social media handle you want to scrape. For example, if you want to scrape the Facebook page of Population Council, enter “PopulationCouncil” in the text box.</p>

        <h3>Step 3: Select the date range you want to scrape</h3>
        <p>Enter the start and end dates for the date range you want to scrape. The date range must be within the last 30 days.</p>

        <h3>Step 4: Click the “Scrape” button</h3>

    </div>

    <div>
        <h2>Important Points:</h2>

        <h3>Documentation</h3>
        <p>For Aditional information on how to use the social media scraper, please refer to the documentation.</p>

        <h3>Contact Support</h3>
        <p>For support or inquiries, please reach out to our IT department. [Emails to be added]</p>
    </div>
   
    </div>
  );
}

export default Explaination;
