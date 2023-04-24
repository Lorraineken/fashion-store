import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../features/cart/slice';
import { fetchProducts } from '../../features/products/slice';
import "../main/product.css";
import Categories from "./Categories";
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
  
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };
  
  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((product) => product.category === selectedCategory);
  
  return (
    <>
    <Categories/>
    <div className="product-container">
    <div className="category-dropdown">
  <ul>
    <li onClick={() => handleCategoryChange("")}>All products</li>
    <li onClick={() => handleCategoryChange("men's clothing")}>Mens clothing</li>
    <li onClick={() => handleCategoryChange("women's clothing")}>Womens clothing</li>
    <li onClick={() => handleCategoryChange("sneakers")}>Sneakers</li>
    <li onClick={() => handleCategoryChange("jewelry")}>Jewelry</li>
    <li onClick={() => handleCategoryChange("Hoodies")}>Hoodies</li>
    <li onClick={() => handleCategoryChange("Denims")}>Denims</li>
  </ul>
</div>
   
    <div className="card_product_container">

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
                    <h3>{product.title}</h3>
                    <p>{`$${product.price}`}</p>
                  </div>
                  {!isProductInCart(product.id) && (
                    <div className="buy" onClick={() => handleClick(product)}><i className="fas fa-shopping-cart"></i></div>
                  )}
                </div>
                {isProductInCart(product.id) && (
                  <div className="right">
                    <div className="done"><i class="fa-solid fa-check"></i></div>
                    <div className="details">
                      {/* <h2>{product.title} <br /><span> Added to cart</span></h2> */}
                      
                      <span> <h2>{product.title}</h2> 
                      <p>Added to cart</p>
                      </span>
                    </div>
                    <div className="remove" onClick={() => handleClose(product)}><i className="fas fa-trash-alt"></i></div>
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
    </div>
    </>
  );
}

export default Products;