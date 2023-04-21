import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from "../../features/cart/slice";
export default function CartDropdown() {
 const dispatch = useDispatch()
const cartDropDown = useSelector((state)=> state.cart.items);
function removeProduct(item){
dispatch(removeFromCart(item.id))
console.log(cartDropDown)
}
  return (
    <div className="cart-dropdown">
      <ul>
        {cartDropDown == null ? (
          <li>Your cart is empty</li>
        ) : (
          cartDropDown.map((item) => (
            <li key={item.id}>
               <img src= {item.image}  alt="" srcset="" /> -  ${item.price} 
              <button onClick={() => removeProduct(item)}>X</button>
            </li>
          ))
        )}
      </ul>
      <button>Checkout</button>
    </div>
  );
}
