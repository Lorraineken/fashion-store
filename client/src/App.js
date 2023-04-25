
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Home from '../src/components/main/Home';
import Categories from '../src/components/main/Categories';
import ContactUs from '../src/components/main/ContactUs';
import Products from '../src/components/main/Products';
import Navbar from '../src/components/navbar/Navbar';
import SignUp from '../src/components/main/SignUp';
import CartIcon from './components/main/CartIcon';
import ProductTable from './features/products/components';
import UserTable from './features/users/components';
import OrdersTable from './features/orders/components';
import Sidebar from './components/admin/Sidebar';
import UserReview from './components/admin/UserReview';
import Cart from './components/main/Cart';
import UserTest from './components/admin/UserTest';

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
            <Route path="/table" element={<ProductTable/>} />
            <Route path="/usertable" element={<UserTable/>} />
            <Route path="/orderstable" element={<OrdersTable/>} />
            <Route path="/sidebar" element={<Sidebar/>} />
            <Route path="/cart" element={<UserTest/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App