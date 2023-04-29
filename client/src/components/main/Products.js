import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, setProductDetail } from "../../features/cart/slice";
import { fetchProducts, updateProduct} from "../../features/products/slice";
import "../main/product.css";
import StarRatings from 'react-star-ratings';
import Categories from "./Categories";
function Products() {
  const products = useSelector((state) => state.products.list);
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts())
      .then(() => setIsLoading(false))
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleClick = (product) => {
    dispatch(addToCart(product));
  };

  const handleClose = (product) => {
    console.log("handleClose called with product:", product);
    dispatch(removeFromCart(product.id));
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };
  const handleRatingChange = (product, newRating) => {
    const updatedProduct = {
      ...product,
      rating: newRating
    };
    dispatch(updateProduct(updatedProduct));
  }
  function handleProductDetails(product){
    console.log(product)
    dispatch(setProductDetail(product))
  }

  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((product) => product.category === selectedCategory);
  if (isLoading) {
    return (
      <div class="preloader">
        <svg
          class="cart"
          role="img"
          aria-label="Shopping cart line animation"
          viewBox="0 0 128 128"
          width="128px"
          height="128px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="8"
          >
            <g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
              <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
              <circle cx="43" cy="111" r="13" />
              <circle cx="102" cy="111" r="13" />
            </g>
            <g class="cart__lines" stroke="currentColor">
              <polyline
                class="cart__top"
                points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                stroke-dasharray="338 338"
                stroke-dashoffset="-338"
              />
              <g class="cart__wheel1" transform="rotate(-90,43,111)">
                <circle
                  class="cart__wheel-stroke"
                  cx="43"
                  cy="111"
                  r="13"
                  stroke-dasharray="81.68 81.68"
                  stroke-dashoffset="81.68"
                />
              </g>
              <g class="cart__wheel2" transform="rotate(90,102,111)">
                <circle
                  class="cart__wheel-stroke"
                  cx="102"
                  cy="111"
                  r="13"
                  stroke-dasharray="81.68 81.68"
                  stroke-dashoffset="81.68"
                />
              </g>
            </g>
          </g>
        </svg>
        <div class="preloader__text">
          <p class="preloader__msg">Bringing you the goods…</p>
          <p class="preloader__msg preloader__msg--last">
            This is taking long. Something’s wrong.
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* <Categories /> */}
      <div className="product-container">
        <div class="sidebar">
          <div class="sidebar-header">History</div>
          <div class="sidebar-content">
            <div class="category-dropdown">
              <ul>
                <li>All products</li>
                <li>Men's clothing</li>
                <li>Women's clothing</li>
                <li>Sneakers</li>
                <li>Jewelry</li>
                <li>Hoodies</li>
                <li>Denims</li>
              </ul>
            </div>
          </div>
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
                  <p id="price">{`$${product.price}`}</p>
                    <img 
                      className="pdt"
                      src={product.image_url}
                      alt={product.name}
                      
                    />
                    <i className="fas fa-search" onClick={()=>handleProductDetails(product)}></i>
                   
                  </div>
                  <div
                    className={`bottom ${
                      isProductInCart(product.id) ? "clicked" : ""
                    }`}
                  >
                    <div className="left">
                      <div className="star">
                      <StarRatings
            rating={
              product.reviews.length > 0
                ? Math.round(
                    product.reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / product.reviews.length
                  )
                : 0
            }
            starRatedColor="gold"
            starDimension="20px"
            numberOfStars={5}
            name='rating'
            changeRating={(newRating) => handleRatingChange(product, newRating)}
          />
          </div>
                      <div className="details">
                        
                        <h3>{product.name}</h3>
                       
                      </div>
                      {!isProductInCart(product.id) && (
                        <div
                          className="buy"
                          onClick={() => handleClick(product)}
                        >
                          <i className="fas fa-shopping-cart"></i>
                        </div>
                      )}
                    </div>
                    {isProductInCart(product.id) && (
                      <div className="right">
                        <div className="done">
                          <i class="fa-solid fa-check"></i>
                        </div>
                        <div className="details">
                          {/* <h2>{product.title} <br /><span> Added to cart</span></h2> */}

                          <span>
                            {" "}
                            <h2>{product.title}</h2>
                            <p>Added to cart</p>
                          </span>
                        </div>
                        <div
                          className="remove"
                          onClick={() => handleClose(product)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="inside">
                  <div className="icon">
                    <i className="material-icons">details</i>
                  </div>
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
