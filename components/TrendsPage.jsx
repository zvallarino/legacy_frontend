// MainDeets.js
import React, { useState } from "react";

import { GrNotes } from "react-icons/gr";
import { GoQuestion } from "react-icons/go";
import { FaDatabase } from "react-icons/fa6";


import { FaTimeline } from "react-icons/fa6";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

function TrendsPage() {
  // State for the timeframes
  const [selectedTimeframe, setSelectedTimeframe] = useState("All Time");

  // State for the graph selection
  const [selectedGraph, setSelectedGraph] = useState("Comparisons");

  // State for the time filter in graphs
  const [timeFilter, setTimeFilter] = useState("All Time");

  // Function to calculate numbers based on timeframe
  const calculateNumber = (baseNumber) => {
    let number;
    if (selectedTimeframe === "All Time") {
      number = baseNumber;
    } else if (selectedTimeframe === "Past Day") {
      number = baseNumber / 365 + getRandomNumber();
    } else if (selectedTimeframe === "Past Week") {
      number = baseNumber / 52 + getRandomNumber();
    } else if (selectedTimeframe === "Past Month") {
      number = baseNumber / 12 + getRandomNumber();
    }
    return Math.round(number);
  };

  const getRandomNumber = () => Math.floor(Math.random() * 10); // Random number between 0 and 9

  // Generate months for the last 6 months
  const months = [...Array(6).keys()].map((i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 5 + i);
    return date.toLocaleString("default", { month: "short" });
  });

  // Generate more variable increasing data
  const generateIncreasingData = () => {
    let value = 50 + Math.floor(Math.random() * 20); // Start with a base value between 50 and 70
    return [...Array(6)].map((_, i) => {
      value += Math.floor(Math.random() * 15) + 5; // Increase by 5 to 19
      return value;
    });
  };

  // Generate more variable decreasing data
  const generateDecreasingData = () => {
    let value = 100 + Math.floor(Math.random() * 20); // Start with a base value between 100 and 120
    return [...Array(6)].map((_, i) => {
      value -= Math.floor(Math.random() * 15) + 5; // Decrease by 5 to 19
      return value > 0 ? value : 0; // Ensure the value doesn't go below 0
    });
  };

  const increasingDiseases = ["Gonorrhea", "Influenza", "Chlamydia", "Herpes"];
  const decreasingDiseases = [
    "COVID-19",
    "Heart Disease",
    "Tuberculosis",
    "Syphilis",
  ];

  const increasingDataForDisease = {};
  increasingDiseases.forEach((disease) => {
    increasingDataForDisease[disease] = generateIncreasingData();
  });

  const decreasingDataForDisease = {};
  decreasingDiseases.forEach((disease) => {
    decreasingDataForDisease[disease] = generateDecreasingData();
  });

  // Generate random data for the graphs
  const generateRandomData = () => {
    const diseases = ["Cases", "Deaths", "Hospitalizations"];
    const months = [...Array(12).keys()].map((i) => {
      const date = new Date();
      date.setMonth(i);
      return date;
    });
    const diseaseData = [];

    diseases.forEach((disease) => {
      months.forEach((month) => {
        diseaseData.push({
          Disease: disease,
          Date: month.toLocaleString("default", {
            month: "long",
            year: "numeric",
          }), // Corrected line
          Count: Math.floor(Math.random() * 1000) + 100, // Random number between 100 and 1099
        });
      });
    });

    return diseaseData;
  };

  const diseaseData = generateRandomData();

  return (
    <div className="flex flex-col h-full w-full ">
      {/* Header */}
      <div className="flex w-full justify-between p-4">
        <div className="text-blue-950 text-6xl flex"> <FaDatabase className="mr-4" />        Data Overview</div>
        <div className="flex items-center">
          <span className="mr-2 text-black">SHARE THIS PAGE</span>
          <a href="https://www.facebook.com" className="ml-2">
            <img
              src="/facebook.png"
              alt="Facebook"
              className="w-6 h-6 rounded-full"
            />
          </a>
          <a href="https://www.instagram.com" className="ml-2">
            <img
              src="/instagram.png"
              alt="Instagram"
              className="w-6 h-6 rounded-full"
            />
          </a>
          <a href="https://www.threads.com" className="ml-2">
            <img
              src="/threads.png"
              alt="Threads"
              className="w-6 h-6 rounded-full"
            />
          </a>
          <a href="mailto:example@example.com" className="ml-2">
            <img
              src="/email.png"
              alt="Email"
              className="w-6 h-6 rounded-full"
            />
          </a>
        </div>
      </div>
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />

      <div className="flex w-full justify-between p-4">
        <div className=" ml-2 text-gray-700">
          Welcome to our data repository. This page serves as a comprehensive
          resource for accessing raw datasets, analyzing data trends, and
          consulting the original sources from which the data was obtained.
        </div>
      </div>

      {/* Our Other Sites Section */}
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />

      <div className="flex items-center ">
        <FaTimeline className="text-blue-900 text-4xl" />
        <div className="ml-2 text-2xl font-bold text-blue-900">
          Our Other Sites
        </div>
      </div>
      <div className="flex w-full justify-evenly border-gray-200 border-2 rounded-md p-4 mb-4 bg-gray-100">
        <div className="flex w-1/3 flex-col items-center justify-center">
          <div className="text-blue-900 text-2xl my-4">CBR</div>
          <a href="https://popcouncil.org/hub/cbr/" className="ml-2">
            <img src="/CBR.png" alt="cbr" className="w-60 h-60 rounded-lg border-2 shadow-md" />
          </a>
          <div  className="text-black my-8">
            The Population Council’s Center for Biomedical Research (CBR) is a
            vibrant hub of scientific investigation and product development. Our
            scientists address critical questions in reproductive health and
            develop innovative products that protect the health and well-being
            of millions of people worldwide.{" "}
          </div>
        </div>

        <div className="flex w-1/3 flex-col items-center justify-center mx-8">
          <div className="text-blue-900 text-2xl my-4">Knowledge Commons</div>
          <a
            href="https://knowledgecommons.popcouncil.org/departments_sbsr/"
            className="ml-2"
          >
            <img src="/SBSR.png" alt="sbsr" className="w-60 h-60 rounded-lg border-2 shadow-md " />
          </a>
          <div className="text-black my-8">
            The Population Council conducts research to address critical health
            and development issues. Knowledge Commons, our digital repository,
            helps to ensure that evidence generated by the Council and partners
            is accessible and can be readily used to inform policies, programs,
            and practices worldwide.
          </div>
        </div>

        <div className="flex w-1/3 flex-col items-center justify-center">
          <div className="text-blue-900 text-2xl my-4">A3</div>
          <a href="https://a3.popcouncil.org/" className="ml-2">
            <img src="/a3.png" alt="a3" className="w-60 h-60 rounded-lg border-2 shadow-md" />
          </a>
          <div className="text-black my-8">
            The Adolescent Atlas for Action (A3) is a suite of tools that
            summarizes the lives and needs of adolescents around the world to
            promote evidence-based decision-making.
          </div>
        </div>
      </div>

  

      {/* Notes Section */}
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />
      <div className="flex items-center p-4 ">
        <GoQuestion className="text-blue-950 text-2xl mr-2" />
        <div className="ml-2 text-xl text-2xl font-bold text-blue-900 ">
          Sources
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full p-4">
          {/* Source 1*/}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4 mb-4">
            <div className="text-blue-800 my-4">
              World Health Organization (WHO)
            </div>
            <div className="text-black">
              The World Health Organization is a specialized agency of the
              United Nations responsible for international public health. It
              monitors health trends, provides leadership on global health
              matters, and compiles data on various health topics worldwide.
            </div>
            <div className="text-black my-4">
              <a
                href="https://www.who.int/"
                className="text-blue-600 underline"
              >
                Visit Website
              </a>
            </div>
          </div>

          {/* Source 2 */}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4">
            <div className="text-blue-800 my-4">
              Centers for Disease Control and Prevention (CDC)
            </div>
            <div className="text-black">
              The CDC is the national public health agency of the United States.
              It provides critical information on health threats, disease
              prevention, and detailed data on various health conditions
              affecting the U.S. population.
            </div>
            <div className="text-black my-4">
              <a
                href="https://www.cdc.gov/"
                className="text-blue-600 underline"
              >
                Visit Website
              </a>
            </div>
          </div>

          {/* Source 3*/}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4 mb-4 mt-2">
            <div className="text-blue-800 my-4">Johns Hopkins University</div>
            <div className="text-black">
              Johns Hopkins University provides comprehensive data on global
              public health, including up-to-date statistics on infectious
              diseases, health metrics, and epidemiological research through its
              Coronavirus Resource Center.
            </div>
            <div className="text-black my-4">
              <a
                href="https://coronavirus.jhu.edu/"
                className="text-blue-600 underline"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />
      <div className="flex items-center p-4 ">
        <GrNotes className="text-blue-950 text-2xl mr-2" />
        <div className="ml-2 text-xl text-2xl font-bold text-blue-900 ">
          NOTES
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full p-4">
          {/* Note 1 */}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4 mb-4">
            <div className="text-blue-800 my-4">November 30, 2024</div>
            <div className="text-black">
              Multiple states with reporting interruptions due to Thanksgiving
              holiday: Please see list here:{" "}
              <a
                href="https://github.com/CSSEGISandData/COVID-19/issues/6304"
                className="text-blue-600 underline"
              >
                https://github.com/CSSEGISandData/COVID-19/issues/6304
              </a>
            </div>
            <div className="text-black my-4">
              <a href="#" className="text-blue-600 underline">
                View All Data Notes
              </a>
            </div>
          </div>

          {/* Note 2 */}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4">
            <div className="text-blue-800 my-4">August 16, 2024</div>
            <div className="text-black">
              Reduced counts in U.S. cases and deaths are the result of states
              and territories not reporting the information for some or all of
              the weekend. Those states and territories are: Alaska, Colorado,
              Connecticut, District of Columbia, Florida, Georgia, Guam, Idaho,
              Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine,
              Massachusetts, Michigan, Minnesota, Mississippi, Montana,
              Nebraska, Nevada, New Hampshire, New Mexico, North Carolina,
              Northern Mariana Islands, Oklahoma, Rhode Island, South Carolina,
              South Dakota, Tennessee, Utah, U.S. Virgin Islands, Virginia,
              Washington, West Virginia, Wisconsin, and Wyoming. Typically,
              these states' Monday updates include the weekend totals.
            </div>
            <div className="text-black my-4">
              <a href="#" className="text-blue-600 underline">
                View All Data Notes
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />
      <div className="flex items-center p-4 ">
        <FaCloudDownloadAlt className="text-blue-950 text-2xl mr-2" />
        <div className="ml-2 text-xl text-2xl font-bold text-blue-900 ">
          Data Download
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full p-4">
          {/* Note 1 */}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4 mb-4">
            <div className="text-blue-800 my-4 items-center">
              Download Our Data
            </div>
            <div className="flex">
              <div className="text-black w-1/4 text-white text-center text-2xl"></div>
              <div
                className="flex items-center justify-center 
             bg-blue-500 w-1/2 h-20 
             text-white text-2xl text-center 
             rounded-lg 
             hover:bg-blue-600 
             transition-colors 
             duration-300"
              >
                <IoMdDownload className="text-4xl" />
              </div>
            </div>
            <div className="text-black my-4">
              <a href="#" className="text-blue-600 underline">
                See Data Usage Notes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendsPage;
