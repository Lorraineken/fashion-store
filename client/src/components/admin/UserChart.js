import React from 'react'
import Chart from 'react-apexcharts';
import './CustomerReview.css';

const UserReview = ({ json }) => {
  // Extract all reviews from all products
  const allReviews = json.products.flatMap(product => product.reviews);

  // Sort reviews by date
  allReviews.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Create arrays of ratings and dates
  const ratings = allReviews.map(review => review.rating);
  const dates = allReviews.map(review => review.date);

  const data = {
    series: [
      {
        name: "Review",
        data: ratings,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        categories: dates,
      },
      yaxis: {
        show: false
      },
      toolbar:{
        show: false
      }
    },
  };
  
  return <div className="CustomerReview">
    <Chart options={data.options} series={data.series} type="area" />
  </div>;
};

export default UserReview