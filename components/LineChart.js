import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = () => {
  const generateOrderedDates = (start, end, numPoints) => {
    const dates = [];
    const timeBetween = (end - start) / (numPoints - 1);

    for (let i = 0; i < numPoints; i++) {
      const date = new Date(start.getTime() + timeBetween * i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    return dates;
  };

  const startDate = new Date('2023-01-01'); // Start of the year
  const endDate = new Date('2023-12-31'); // End of the year
  const numPoints = 18; // Number of data points

  const labels = generateOrderedDates(startDate, endDate, numPoints);

  const data = {
    labels,
    datasets: [
      {
        data: Array(18).fill().map(() => Math.random() * 100), // Random data points
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
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

export default LineChart;