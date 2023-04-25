import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from "../../../axios/axios";

const LineChart = () => {
  const chartRef = useRef(null);
  const [totalBooking, setTotalBooking] = useState([]);
  const [bookingProfit, setBookingProfit] = useState([]);
  const [bookingCount, setBookingCount] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    axios.get("/admin/get_monthlylineChart").then((res) => {
      setTotalBooking(res.data.totalBooking);
      setBookingProfit(res.data.bookingProfit);
      setBookingCount(res.data.bookingCount);
      setMonths(res.data.months);
    });
  }, []);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Total Revenue',
            data: totalBooking,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Total Profit',
            data: bookingProfit,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
          {
            label: 'Total Booking',
            data: bookingCount,
            borderColor: 'rgba(11, 243, 28, 0.8)',
            backgroundColor: 'rgba(11, 243, 28, 0.8)',
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [totalBooking, bookingProfit, bookingCount, months]);

  return (
    <div className='h-96 w-full'>
      <canvas ref={chartRef} style={{ height: '200px', width: '200px' }} />
    </div>
  );
};

export default LineChart;


