import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { fetchReviews} from "../../features/reviews/slice";
import './chart.css'


const UserReview = () => {
  
  const dispatch = useDispatch();
  const allReviews = useSelector(state => state.reviews.list);

  // Fetch reviews on component mount
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  // Sort reviews by date
  const sortedReviews = [...allReviews].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Create arrays of ratings and dates
  const ratings = sortedReviews.map(review => review.rating);
  const dates = sortedReviews.map(review => review.date);

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
        height: 1,
        width:'20%',
      },
      fill: {
        colors: ["#ff929f"],
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
        show: ratings,
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
  
  return <div className="customerReview">
    <Chart options={data.options} series={data.series} type="area"  className= "chart"/>
  </div>;
};

export default UserReview;