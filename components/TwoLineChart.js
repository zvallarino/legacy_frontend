"use client"

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TwoLineChart = () => {
  const generateOrderedDates = (start, numPoints) => {
    const dates = [];
    const oneDayInMs = 24 * 60 * 60 * 1000; // milliseconds in a day
    const timeBetween = 90 / (numPoints - 1) * oneDayInMs; // time between points in 90-day range

    for (let i = 0; i < numPoints; i++) {
      const date = new Date(start.getTime() + timeBetween * i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    return dates;
  };

  const startDate = new Date(); // Current date
  const numPoints = 18; // Number of data points

  const labels = generateOrderedDates(startDate, numPoints);

  const data = {
    labels,
    datasets: [
      {
        // First dataset (Blue)
        data: Array(numPoints).fill().map(() => Math.random() * 100), // Random data points
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        // Second dataset (Red)
        data: Array(numPoints).fill().map(() => Math.random() * 100), // Random data points
        fill: false, // No fill for the second dataset
        borderColor: 'red', // Red line
      }
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false // Hides X-axis grid lines
        }
      },
      y: {
        grid: {
          display: false // Hides Y-axis grid lines
        }
      }
    },
    plugins: {
      legend: {
        display: false // Hides the legend
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default TwoLineChart;