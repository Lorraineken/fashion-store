import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import Video from "../assets/video1.mp4"

const Home = () => {
  return (
    <div className='container'>
      <div className='hero'>
        <h1>Welcome !<br />To F@shion Store</h1>
        <p>Shop now or explore the collection</p>
      </div>
      <button className='btnnn'>
  <Link to="/categories" className="text">Get Started <i className="fa-solid fa-arrow-right ml-1"></i></Link>
</button>

      <div className="gify">
        <video autoPlay muted loop id="video">
          <source src={Video} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default Home
