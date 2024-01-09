"use client"

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


const TwoLineChart = () => {
  const generateOrderedDates = (start, numPoints) => {
    const dates = [];
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const timeBetween = 90 / (numPoints - 1) * oneDayInMs;

    for (let i = 0; i < numPoints; i++) {
      const date = new Date(start.getTime() + timeBetween * i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    return dates;
  };

  const startDate = new Date();
  const numPoints = 18;
  const labels = generateOrderedDates(startDate, numPoints);

  const firstDataset = Array(numPoints).fill().map(() => Math.random() * 5000);
  const average = firstDataset.reduce((sum, value) => sum + value, 0) / numPoints;

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Reach', // Label for the blue line
        data: firstDataset,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)', // Color of points
      },
      {
        label: 'Average Reach', // Label for the red line
        data: Array(numPoints).fill(average),
        fill: false,
        borderColor: 'red',
        borderWidth: 2, // Making the line thinner
        pointRadius: 0, // Removing the points from the line
      }
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: true // Enabling the legend
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default TwoLineChart;