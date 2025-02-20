"use client";
import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import LineChart from "./LineChart";

function Engaged() {
  const [timeRange, setTimeRange] = useState("7d");
  const [dateRange, setDateRange] = useState("");
  
  const [current, setCurrent] = useState([82577,8391834, 70190,7636569]);

  useEffect(() => {
    setDateRange(getDateRangeString(timeRange));
    getNumber();
    console.log(dateRange);
  }, [timeRange]);
  
  const getNumber = () => {
    let currentEngaged;
    let currentImpression;

    let prevEngaged;
    let prevImpression;
    switch (timeRange) {
      case "1d":
        currentEngaged = 82577 / 365;
        currentImpression = 8391834 / 365;

        prevEngaged = 82577 / 365 * .85
        prevImpression = 8391834 / 365 * .91
        break;
      case "7d":
        currentEngaged = 82577 / 52;
        currentImpression = 8391834 / 52;

        prevEngaged = 82577 / 52 * .85
        prevImpression = 8391834 / 52 * .91

        break;
      // Add cases for other time ranges
      case "1m":
        currentEngaged = 82577 / 12;
        currentImpression = 8391834 / 12;

        prevEngaged = 82577 / 12 * .85
        prevImpression = 8391834 / 12 * .91
        break;
      case "3m":
        currentEngaged = 82577 / 4;
        currentImpression = 8391834 / 4;

        prevEngaged = 82577 / 4 * .85
        prevImpression = 8391834 / 4 * .91
        break;
      case "1y":
        currentEngaged = 82577;
        currentImpression = 8391834;

        prevEngaged = 82577 * .85
        prevImpression = 8391834 * .91
        break;
      case "all":
        currentEngaged = 82577 * 3;
        currentImpression = 8391834 * 3;

        prevEngaged = 82577 * 3 * .85
        prevImpression = 8391834 * 3 * .91
        break;
      // You can add more cases for different time ranges if needed
      default:
        currentEngaged = 0;
        currentImpression = 0;

        prevEngaged = 0;
        prevImpression = 0;
    }
  
    // Round the numbers first before converting to locale string
    currentEngaged = Math.round(currentEngaged);
    currentImpression = Math.round(currentImpression);
    prevEngaged = Math.round(prevEngaged);
    prevImpression = Math.round(prevImpression);
    
    // Convert the numbers to a string with commas for thousands
    currentEngaged = currentEngaged.toLocaleString();
    currentImpression = currentImpression.toLocaleString();

    prevEngaged = prevEngaged.toLocaleString();
    prevImpression = prevImpression.toLocaleString();
  
    const numArray = [currentEngaged, currentImpression, prevEngaged, prevImpression];

    setCurrent(numArray); // Assuming setCurrent takes a single argument
  };

  
  const getDateRangeString = (timeRange) => {
    console.log(timeRange);
    const endDate = new Date(); // today's date
    let startDate = new Date();

    switch (timeRange) {
      case "1d":
        startDate.setDate(endDate.getDate() - 1);
        break;
      case "7d":
        startDate.setDate(endDate.getDate() - 6);
        break;
      // Add cases for other time ranges
      case "1m":
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "3m":
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      case "all":
          startDate.setFullYear(endDate.getFullYear() - 5);
          break;
      // You can add more cases for different time ranges if needed
      default:
        return "";
    }

    // Formatting the date to 'MMM dd, yyyy' format
    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    console.log(endDate);
    console.log(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;

  };

  return (
    <div className="flex flex-col h-full w-full  bg-white p-2">
      <div className=" bg-white shadow-md rounded-md px-2 mb-4">
        <h1 className="text-2xl font-bold my-4 text-black  bg-">
          Engagement and Impressions
        </h1>

        <div className="flex justify-between mb-2">
          <div className="text-black">{dateRange}</div>
          <Dropdown timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </div>

      <div className="flex flex-wrap items-center text-black w-full h-full ">
        <div className=" w-full bg-white h-full rounded-md shadow-md ">
          <div className="text-center font-bold m-4">Popularity Ranking</div>
     
       
        <div className="flex flex-1">
          <div className=" w-1/2 mr-1 rounded-lg shadow-lg">
            <div className="justify-center text-center mt-8">
              <div className="font-bold">Engaged Users</div>
              <div className="font-extrabold text-6xl">{current[0]}</div>
              <div className="flex items-center justify-center"><AiFillCaretUp  className="text-green-500 text-center" />15%</div>
       
              <div className="font-light">{`${current[2]} [previous]`}</div> 
            </div>
            <LineChart />
          </div>
          <div  className=" w-1/2 ml-1 rounded-lg shadow-lg">
            <div className="justify-center text-center mt-8 ">
              <div className="font-bold">Page Impressions</div>
              <div  className="font-extrabold text-6xl">{current[1]}</div>
              <div className="flex items-center justify-center"> <AiFillCaretDown className="text-green-500 text-center" />9%</div>
             
              <div className="font-light">{`${current[3]} [previous]`}</div> 
            </div>
            <LineChart />
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Engaged;
