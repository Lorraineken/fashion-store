import React, { useState } from "react";

export default function CartDropdown() {
  const [cartItems, setCartItems] = useState([]);

  // function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div className="cart-dropdown">
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
