import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../src/components/main/Home';
import Categories from '../src/components/main/Categories';
import ContactUs from '../src/components/main/ContactUs';
import Products from '../src/components/main/Products';
import Navbar from '../src/components/navbar/Navbar';
import SignUp from '../src/components/main/SignUp';
import CartIcon from './components/main/CartIcon';

const App = () => {
  return (
    <div>

        <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/carticon" element={<CartIcon />} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App