import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import Video from "../assets/video1.mp4"
// import image1 from "../assets/img1.jpg"
import AboutUs from './AboutUs';

const Home = () => {
  return (
    <div className='container'>
      <div className='hero'>
        <h1>Welcome !<br />To F@shion Store</h1>
        <p>Shop now or explore the collection</p>
      </div>
      <button className='btnnn'>
  <Link to="/signup" className="text">Get Started <i className="fa-solid fa-arrow-right ml-1"></i></Link>
</button>

      <div className="gify">
        <video autoPlay muted loop id="video">
          <source src={Video} type="video/mp4" />
        </video>
      </div>
      <div className="img">
      <img className="imgg"src='https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80' alt=""/>
      </div>
      <AboutUs />
    </div>
  )
}

export default Home
