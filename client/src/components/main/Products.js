import React from 'react';
import '../main/product.css'
function Products() {
  function handleAdd(){
    document.querySelector('.bottom').classList.add("clicked");
  }

  const handleRemove = () => {
    document.querySelector('.bottom').classList.remove("clicked");
  };


  return (
    <div className="card_product_container">
    <div className="wrapper">
      <div className="container">
        <div className="top"></div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h1>Coat</h1>
              <p>£250</p>
            </div>
            <div className="buy" onClick={handleAdd}><i className="material-icons">add</i></div>
          </div>
          <div className="right">
            <div className="done"><i className="material-icons">✔️</i></div>
            <div className="details">
              <h1>Coat</h1>
              <p>Added to your cart</p>
            </div>
            <div className="remove" onClick={handleRemove}><i className="material-icons">X</i></div>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon"><i className="material-icons">details</i></div>
        <div className="contents">
          {/* <table>
            <thead>
              <tr>
                <th>Width</th>
                <th>Height</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3000mm</td>
                <td>4000mm</td>
              </tr>
              <tr>
                <td>200mm</td>
                <td>200mm</td>
              </tr>
              <tr>
                <td>200mm</td>
                <td>200mm</td>
              </tr>
              <tr>
                <td>200mm</td>
                <td>200mm</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Products;


/*

/*
import React, { useState } from "react";


const MyComponent = () => {
  const [clicked, setClicked] = useState(false);

  const handleRemove = () => {
    setClicked(clicked);
  };

  const handleClick = () => {
    setClicked(false);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="top"></div>
        <div className={`bottom${!clicked ? " clicked" : ""}`}>
          <div className="left">
            <div className="details">
              <h1>Title</h1>
              <p>Description</p>
            </div>
            <div className="buy" onClick={handleClick}>
              <i className="fas fa-cart-plus" >buy</i>
            </div>
          </div>
          <div className="right">
            <div className="details">
              <h1>Title</h1>
              <p>Remove</p>
            </div>
            <div className="done">
              <i className="fas fa-check"></i>
            </div>
            <div className="remove" onClick={handleRemove}>
              <i className="fas fa-times">x</i>
            </div>
          </div>
        </div>
      </div>
      <div className="inside" >
        <div className="icon">
          <i className="fas fa-mouse-pointer"></i>
        </div>
        <div className="contents">
          <h2>Click Me</h2>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;


*/
