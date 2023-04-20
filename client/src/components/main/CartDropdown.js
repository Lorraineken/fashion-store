import React from "react";

export default function CartDropdown({ cartItems, removeFromCart, addToCart }) {
  return (
    <div className="cart-dropdown">
      <ul>
        {cartItems.length === 0 ? (
          <li>Your cart is empty</li>
        ) : (
          cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)}{" "}
              <button onClick={() => removeFromCart(item)}>X</button>
            </li>
          ))
        )}
      </ul>
      <button onClick={() => addToCart(cartItems)}>Checkout</button>
    </div>
  );
}
