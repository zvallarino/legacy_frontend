"use client";
import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import LineChart from "./LineChart";

function Engaged() {
  const [timeRange, setTimeRange] = useState("7d");
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    setDateRange(getDateRangeString(timeRange));
    console.log(dateRange);
  }, [timeRange]);

  const getDateRangeString = (timeRange) => {
    console.log("fired");
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
    <div className="flex flex-col h-full w-full bg-red-300">
      <div>
        <h1 className="text-2xl font-bold my-4 text-black">
          Engagement and Impressions
        </h1>

        <div className="flex justify-between">
          <div className="text-black">{dateRange}</div>
          <Dropdown timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </div>

      <div className="flex flex-wrap items-center text-black w-full bg-pink-300 h-full ">
        <div className=" w-full bg-green-300 h-full">
          <div>Popularity Ranking</div>
     
       
        <div className="flex flex-1 bg bg-yellow-200 border-2 border-green-900">
          <div className="border-2 border-red-900 w-1/2">
            <div className="font-bold">Engaged Users</div>
            <div className="font-extrabold text-4xl">19,878</div>
            <div>15%</div>
            <AiFillCaretUp  className="text-green-500" />
            <div>16,575[previous]</div> 
            <LineChart />
          </div>
          <div  className="border-2 border-yellow-900 w-1/2">
            <div>Page Impressions</div>
            <div>8,391,834</div>
            <div>9%</div>
            <AiFillCaretDown />
            <div>7,621,351[previous]</div> 
            <LineChart />
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Engaged;
