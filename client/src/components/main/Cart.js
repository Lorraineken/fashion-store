import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setDeliveryOption, updateItemQuantity } from '../../features/cart/slice';
function Cart() {
  const cartData = useSelector(state => state.cart.items);
  const deliveryOption = useSelector(state => state.cart.deliveryOption);
  const dispatch = useDispatch()
  const handleQuantityChange  = (event, id) => {

    const quantity = Number(event.target.value);
    dispatch(updateItemQuantity({ id, quantity }));

    // const newCartData = cartData.map(item => {
    //   if (item.id === id) {
    //     return { ...item, quantity: event.target.value };
    //   }
    //   return item;
    // });
    // setCartData(newCartData);
    // setTotalCost(getTotalCost());

  }

  const handleDeliveryOptionChange = (event) => {
    dispatch(setDeliveryOption(event.target.value));
    // setDeliveryOption(event.target.value);
    // setTotalCost(getTotalCost());
  }

  const getSubtotal = () => {
    const subtotal = cartData.reduce((acc, item) => {
      if (typeof item.quantity === 'number') {
        return acc + (item.price * item.quantity);
      }
      return acc;
    }, 0);
    return subtotal;
  }

  const getTotalItems = () => {
    return cartData.reduce((acc, item) => acc + item.quantity, 0);
  }

  const getTotalCost = () => {
    let total = getSubtotal();
    if (deliveryOption === 'delivery') {
      total += 200;
    } else if (deliveryOption === 'collection') {
      total -= 50;
    }
    return total;
    
  }
  const [totalCost, setTotalCost] = useState(getTotalCost());
  
  if (cartData.length === 0) {
    return <div>Your cart is empty</div>;
  }
  return (
    <div> 
    <div class="basket">
      <div class="basket-module">
        <label for="promo-code">Enter a promotional code</label>
        <input id="promo-code" type="text" name="promo-code" maxlength="5" class="promo-code-field"/>
        <button class="promo-code-cta">Apply</button>
      </div>
      <div class="basket-labels">
        <ul>
          <li class="item item-heading">Item</li>
          <li class="price">Price</li>
          <li class="quantity">Quantity</li>
          <li class="subtotal">Subtotal</li>
        </ul>
      </div>
      <div class="basket-product">
        <div class="item">
          <div class="product-image">
            <img src="http://placehold.it/120x166" alt="Placholder Image 2" class="product-frame"/>
          </div>
          <div class="product-details">
            <h1><strong><span class="item-quantity">4</span> x Eliza J</strong> Lace Sleeve Cuff Dress</h1>
            <p><strong>Navy, Size 18</strong></p>
            <p>Product Code - 232321939</p>
          </div>
        </div>
        <div class="price">26.00</div>
        <div class="quantity">
  {cartData[0] && <input type="number" value={cartData[0].quantity} min="1" class="quantity-field" onChange={(event) => handleQuantityChange(event, cartData[0].id)}/>}
</div>
        <div class="subtotal">104.00</div>
        <div class="remove">
          <button>Remove</button>
        </div>
      </div>
    </div>
    <aside>
    <div class="summary">
          <div class="summary-total-items"><span class="total-items">{getTotalItems()}</span> Items in your Bag</div>
          <div class="summary-subtotal">
            <div class="subtotal-title">Subtotal</div>
            <div class="subtotal-value final-value" id="basket-subtotal">{getSubtotal().toFixed(2)}</div>

          <div class="summary-promo hide">
            <div class="promo-title">Promotion</div>
            <div class="promo-value final-value" id="basket-promo"></div>
          </div>
        </div>
        <div class="summary-delivery">
            <select name="delivery-collection" class="summary-delivery-selection" onChange={handleDeliveryOptionChange}>
              <option value="0" selected="selected">Select Collection or Delivery</option>
              <option value="collection">Collection</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
        <div class="summary-total">
            <div class="total-title">Total</div>
            <div class="total-value final-value" id="basket-total">{totalCost.toFixed(2)}</div>
          </div>
        <div class="summary-checkout">
          <button class="checkout-cta">Go to Secure Checkout</button>
        </div>
      </div>
    </aside>
  </div>
  )
}

export default Cart