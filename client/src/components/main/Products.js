import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../features/cart/slice';
import "../main/product.css";
function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [clickedProducts, setClickedProducts] = useState([]);

  const dispatch = useDispatch()
  useEffect(() => {
    fetch("https://api.npoint.io/61f48a63e201ea40f86f/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);
  const handleClick = (product) => {
    setClickedProducts([...clickedProducts, product.id]);
    dispatch(addToCart(product))
  };
  const handleClose = (product) => {
    setClickedProducts(clickedProducts.filter(id => id !== product.id));
    dispatch(removeFromCart(product.id))
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
              <div className={`bottom ${clickedProducts.includes(product.id) ? "clicked" : ""}`}>
                <div className="left">
                  <div className="details">
                    <h1>{product.title}</h1>
                    <p>{`$${product.price}`}</p>
                  </div>
                  <div className="buy" onClick={() => handleClick(product)}><i className="material-icons">add</i></div>
                </div>
                <div className="right">
                  <div className="done"><i class="fa-solid fa-check"></i></div>
                  <div className="details">
                    <p>Added to your cart</p>
                  </div>
                  <div className="remove" onClick={() => handleClose(product)}><i className="material-icons">X</i></div>
                </div>
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