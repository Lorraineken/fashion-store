import "../navbar/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartDropdown from "../main/CartDropdown";

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
          <Link to="/Categories" className="nav-link">
            Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/About Us" className="nav-link">
            About us
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            SignUp
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
