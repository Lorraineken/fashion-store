import "../navbar/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartDropdown from "../main/CartDropdown";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function Navbar() {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Products" className="nav-link">
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
          <Link to="/signup" className="nav-link">
            SignUp
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sidebar" className="nav-link">
            sidebar
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            cart
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/details" className="nav-link">
            Details
          </Link>
        </li>
      </ul>
      <li className="font">
        <Link to="#" className="nav-link" onClick={toggleCartDropdown}>
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
    </nav>
  );
}
