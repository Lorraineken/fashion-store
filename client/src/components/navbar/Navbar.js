import "../navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartDropdown from "../main/CartDropdown";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../features/users/logoutSlice";

export default function Navbar({setProductDetailss}) {
  console.log('setProductDetailss:', setProductDetailss);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.user.user);
  const usersSignup = useSelector((state) => state.userSignup.users);
const redirect  = useNavigate()
  const toggleCartDropdown = () => {
    setShowCartDropdown(!showCartDropdown);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, ...product]);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
  };

  const scrollToAboutUs = () => {
    scroll.scrollTo(document.querySelector(".card").offsetTop);
  };
  const handleLinkClick = (event) => {
    event.preventDefault();
    if (setProductDetailss) {
      setProductDetailss(null);
    }
    redirect('/products')
  };
  const handleLogout = ()=>{
    console.log('clicked')
    console.log(logoutUser())
dispatch(logoutUser())

  }
  
  return (
    <>
  {userLogin || usersSignup ? (  
  <nav className="navbar">
  <div className="app_name"> <Link to="/sampleHome" className="nav-link" >
       <span>Fashionnova</span>
      </Link></div>
  <ul className="navbar-nav">
  <li className="nav-item">
     
    </li>
    <li className="nav-item">
      <Link to="/" className="nav-link" >
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/Products" className="nav-link" onClick={handleLinkClick}>
        Products
      </Link>
    </li>
    <li className="nav-item">
      <ScrollLink
        to="about-us"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        className="nav-link"
        onClick={scrollToAboutUs}
      >
        AboutUs
      </ScrollLink>
    </li>
    <li className="nav-item">
      <Link to="/signup" className="nav-link" >
        SignUp
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/sidebar" className="nav-link" >
        sidebar
      </Link>
    </li>
    <li className="nav-item">
    <li className="font">
    <Link to="cart" className="nav-link">
      <i className="fa fa-shopping-bag" aria-hidden="true"></i>
    </Link>
    {showCartDropdown && (
      <CartDropdown
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
      />
    )}
  </li>
    </li>
    
  <button  onClick={handleLogout}> logout</button>
    
  </ul>

</nav>):(  
<nav className="navbar">
<div className="app_name"> <Link to="/sampleHome" className="nav-link" >
     <span>Fashionnova</span>
    </Link></div>
<ul className="navbar-nav">
<li className="nav-item">
   
  </li>
  {/* <li className="nav-item">
    <Link to="/" className="nav-link" >
      Home
    </Link>
  </li> */}
  <li className="nav-item">
    <Link to="/Products" className="nav-link" onClick={handleLinkClick}>
      Products
    </Link>
  </li>
  {/* <li className="nav-item">
    <ScrollLink
      to="about-us"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      className="nav-link"
      onClick={scrollToAboutUs}
    >
      AboutUs
    </ScrollLink>
  </li> */}

  {/* <li className="nav-item">
    <Link to="/sidebar" className="nav-link" >
      sidebar
    </Link>
  </li> */}
  <li className="nav-item">
  <li className="font">
  <Link to="cart" className="nav-link">
    <i className="fa fa-shopping-bag" aria-hidden="true"></i>
  </Link>
  {showCartDropdown && (
    <CartDropdown
      cartItems={cartItems}
      removeFromCart={removeFromCart}
      addToCart={addToCart}
    />
  )}
</li>
  </li>
  <li className="nav-item">
    <Link to="/signup" className="nav-link" >
      Login
    </Link>
  </li>
  {/* <li>
<button  onClick={handleLogout}> logout</button>
</li> */}
</ul>

</nav>)}
</>
  );
}
