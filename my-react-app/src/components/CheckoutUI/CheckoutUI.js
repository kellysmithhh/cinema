import React from 'react';
import './CheckoutUI.css'; 

function CheckoutUI() {
  return (
    <div className="CheckoutUI">
      <div className="LeftSection">
        {/* Left Section - Promotion Code */}
        <h2>Promotion Code</h2>
        <div className="PromotionCodeInput">
          <input type="text" placeholder="Enter code" />
          <button_1>Apply</button_1>
        </div>
      </div>

      <div className="MiddleSection">
        {/* Middle Section - Credit Card Information */}
        <h2>Credit Card Information</h2>
        <form>
          <select>
            <option>Visa</option>
            <option>MasterCard</option>
            <option>American Express</option>
          </select>

          <input type="text" placeholder="Card number" />
          <input type="text" placeholder="MM/YY" />
          <input type="text" placeholder="Billing Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
          <input type="text" placeholder="Zip Code" />
          <button className="AddCard"> Add Card</button>
        </form>
      </div>

      <div className="RightSection">
        {/* Right Section - Order Summary */}
        <h2>Order Summary</h2>
        <div className="OrderSummaryList">
          <div>
            <span>Movie:</span> Oppenheimer
          </div>
          <div>
            <span>Date:</span> October 7, 2023
          </div>
          <div>
            <span>Time:</span> 7:30 PM
          </div>
          <div>
            <span>Seats:</span> B1, B2, B3
          </div>
          <div>
            <span>Adult Tickets:</span> 2
          </div>
          <div>
            <span>Child Tickets:</span> 1
          </div>
          <div>
            <span>Total:</span> $30.00
          </div>
        </div>

        <div className="ButtonContainer">
        <button className="ConfirmButton">Place Order </button>
        <button className="CancelButton">Cancel</button>

      </div>
      </div>

      

    </div>
  );
}

export default CheckoutUI;
