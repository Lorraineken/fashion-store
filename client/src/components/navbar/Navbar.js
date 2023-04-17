import "../navbar/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartDropdown from "../main/CartDropdown";

export default function Navbar() {
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  // function to toggle the visibility of the cart dropdown
  const toggleCartDropdown = () => {
    setShowCartDropdown(!showCartDropdown);
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
          <Link to="/contactus" className="nav-link">
            ContactUs
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
        {showCartDropdown && <CartDropdown />}
      </li>
    </nav>
  );
}
