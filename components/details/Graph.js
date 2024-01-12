import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


function Graph({currentName}) {

  
// Sample data
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Posts over time',
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      tension: 0.4
    }
  ]
};

// Options
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 18 // Set the font size here
        }
      }
    },
    title: {
      display: true,
      text: `Graph of ${currentName || "Subreddit"}`,
      font: {
        size: 24 // Double the size of the title font
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


  return (
    <div style={{ width: '50%', height: 'auto', backgroundColor: 'white' }} 
    className='p-4 rounded-lg shadow-md'>
 <Line data={data} options={options} />
</div>
  );
}

export default Graph;