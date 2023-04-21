import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../features/cart/slice';
import { fetchProducts } from '../../features/products/slice';
import "../main/product.css";

function Products() {
  
  const products = useSelector(state => state.products.list);
  const cartItems = useSelector(state => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
      .then(() => setIsLoading(false))
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [dispatch]);
  
  const handleClick = (product) => {
    dispatch(addToCart(product))
  };
  
  const handleClose = (product) => {
    console.log('handleClose called with product:', product);
    dispatch(removeFromCart(product.id))
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };
  
  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((product) => product.category === selectedCategory);
  
  return (
    <div className="card_product_container">
      <div className="category-dropdown">
        <select value={selectedCategory} onChange={handleCategoryChange} open>
          <option value="">All products</option>
          <option value="men's clothing">Mens clothing</option>
          <option value="women's clothing">Womens clothing</option>
          <option value="sneakers">Sneakers</option>
          <option value="jewelry">jewelry</option>
          <option value="Hoodies">Hoodies</option>
          <option value="Denims">Denims</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        filteredProducts.map((product) => (
          <div key={product.id} className="wrapper">
            <div className="container">
              <div className="top">
                <img className='pdt'src={product.image} alt={product.title} />
              </div>
              <div className={`bottom ${isProductInCart(product.id) ? "clicked" : ""}`}>
                <div className="left">
                  <div className="details">
                    <h1>{product.title}</h1>
                    <p>{`$${product.price}`}</p>
                  </div>
                  {!isProductInCart(product.id) && (
                    <div className="buy" onClick={() => handleClick(product)}><i className="material-icons">add</i></div>
                  )}
                </div>
                {isProductInCart(product.id) && (
                  <div className="right">
                    <div className="done"><i class="fa-solid fa-check"></i></div>
                    <div className="details">
                      <p>Added to your cart</p>
                    </div>
                    <div className="remove" onClick={() => handleClose(product)}><i className="material-icons">X</i></div>
                  </div>
                )}
              </div>
            </div>
            <div className="inside">
              <div className="icon"><i className="material-icons">details</i></div>
              <div className="contents">
                <p>{`Details about ${product.title}`}</p>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Products;