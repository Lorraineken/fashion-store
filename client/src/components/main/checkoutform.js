import React, { useState } from "react";

const CheckoutForm = ({ cartData, totalCost }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
    console.log("Form submitted");
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return ( 
    <form onSubmit={handleSubmit}>
      <h2>Checkout Form</h2>
      <h3>Order Summary:</h3>
      <ul>
        {cartData.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} x ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
      <div>
        <label htmlFor="payment-method">Payment Method:</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          required
        >
          <option value="">-- Select Payment Method --</option>
          <option value="mpesa">Mpesa</option>
          <option value="debit-card">Debit Card</option>
        </select>
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default CheckoutForm;
