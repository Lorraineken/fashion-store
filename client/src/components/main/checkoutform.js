import React from "react";
import "../main/checkoutform.css";
import Image from "../assets/card_img.png";
import { useSelector } from "react-redux";

const Checkoutform = () => {
  
  const items = useSelector((state) => state.cart.items);
  const deliveryOption = useSelector((state) => state.cart.deliveryOption);
  const totalCost = useSelector((state) => state.cart.sumCost);
  const totalItems = useSelector((state) => state.cart.totalItems);

  console.log(items,'',deliveryOption,'',totalCost,'',totalItems)

  function handleOptionChange(){

  }
  return (
    <div className="checkoutFormContainer">

    <div className="checkform">
      <div class="container">
        <form action="">
          <div class="row">
            <div class="col">
              <h3 class="title">billing address</h3>

              <div class="inputBox">
                <span>full name :</span>
                <input type="text" placeholder="john deo" />
              </div>
              <div class="inputBox">
                <span>email :</span>
                <input type="email" placeholder="example@example.com" />
              </div>
              <div class="inputBox">
                <span>address :</span>
                <input type="text" placeholder="room - street - locality" />
              </div>
              <div class="inputBox">
                <span>city :</span>
                <input type="text" placeholder="mumbai" />
              </div>

              <div class="flex">
                <div class="inputBox">
                  <span>state :</span>
                  <input type="text" placeholder="india" />
                </div>
                <div class="inputBox">
                  <span>zip code :</span>
                  <input type="text" placeholder="123 456" />
                </div>
              </div>
            </div>

            <div class="col">
              <h3 class="title">payment</h3>

              <div class="inputBox">
                <span>cards accepted :</span>
                <img src={Image} alt="" />
              </div>
              <div class="inputBox">
                <span>name on card :</span>
                <input type="text" placeholder="mr. john deo" />
              </div>
              <div class="inputBox">
                <span>credit card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444" />
              </div>
              <div class="inputBox">
                <span>exp month :</span>
                <input type="text" placeholder="january" />
              </div>

              <div class="flex">
                <div class="inputBox">
                  <span>exp year :</span>
                  <input type="number" placeholder="2023" />
                </div>
                <div class="inputBox">
                  <span>CVV :</span>
                  <input type="text" placeholder="1234" />
                </div>
              </div>
            </div>
          </div>

          <input type="submit" value="proceed to checkout" class="submit-btn" />
        </form>
      </div>
    </div>
    <div className="orderDetailsContainer">
<h2>You Order</h2>
{/* <div className="orderProducts">
  
</div> */}
      <table>
        <thead>
          <tr>
            <th className="ordertableRow">Product</th>
            <th>Price</th>
            
            {/* <th>Email</th>
            <th>Password</th>
            <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{`${item.name} X ${item.quantity}`}</td>
              <td>{item.quantity * item.price}</td>
            </tr>
          ))}
                        {/* <td>{user.email}</td>
              <td>{user.password}</td> */} 
        </tbody>
        <thead>
          <tr>
            <th className="ordertableRow">Quantity </th>
            <th>Total </th>
            
        
          </tr>
        </thead>
        <tbody>
        <tr>
              <td>{totalItems}</td>
              <td>{totalCost}</td>
            </tr>
          
             
        </tbody>
        <thead>
          <tr>
            <th className="ordertableRow">Location </th>
            <th>Status </th>
            
        
          </tr>
        </thead>
        <tbody>
        <tr>
              <td>{deliveryOption}</td>
              <td>{'Pending'}</td>
            </tr>
          
             
        </tbody>
      </table>
      <select
              name="payment"
              className="paymentMethod"
              onChange={handleOptionChange}
            >
              <option value="0" selected="selected">
                Select your Location/Address
              </option>
              <option value="Mpesa">Mpesa</option>
              <option value="Paypal">Paypal</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Cash">Cash</option>
              <option value="Check">Check</option>
            </select> <br />

            <button>Confirm Order</button>
</div>
    </div>
  );
};

export default Checkoutform;
