import React, { useEffect, useState } from 'react';
import './CheckoutUI.css'; 
import { useNavigate, useLocation } from 'react-router-dom';

function CheckoutUI() {

  let navigate = useNavigate(); 
  const[email,setEmail] = useState('');

  const location = useLocation();
  const { selectedDate, selectedTime, movieTitle, childTickets, adultTickets, seniorTickets } = location.state;
  const adultCost = 12.99 * adultTickets;
  const childCost = 10.99 * childTickets;
  const seniorCost = 11.99 * seniorTickets;
  const[totalCost,setTotalCost] = useState(adultCost + childCost + seniorCost);
  const[promoInput,setPromoInput] = useState('');
  const[promoPercent,setPromoPercent] = useState('');

  useEffect(() => {
    var session = localStorage.getItem('session');
    session = session.replace(/^"(.*)"$/, '$1');
    const apigetURL = `http://localhost:8080/user/get/user/${session}`;
     fetch(apigetURL, {
       method:"GET",
       headers:{"Content-Type":"application/json"}})
       .then((response)=> response.json())
       .then((data) => { 
          setEmail(data.email)
       })
       .catch(error => {
         console.error('Error fetching data:', error);
     });        
  }, []);

  useEffect(() => {
    if (promoPercent !== "code not present") {
      const discountedCost = totalCost - (totalCost * promoPercent);
      setTotalCost(discountedCost);
    }
  }, [promoPercent]);

    const handlePlaceOrder = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8080/email/send/order/confirmation/${email}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
    }).then(()=>{
        console.log("New movie added.")
    });

      let path = `/OrderConfirmation`; 
      navigate(path);
    }

    const handlePromoClick = (e) => {
      e.preventDefault();
      // fetch to check for promocode in db
  fetch(`http://localhost:8080/promotions/check/promo/${promoInput}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success
      return response.text(); // Return the promise for further chaining
    })
    .then(data => {
      if (data === "code not present") {
        alert("code not present.")
      } else {
        const percentValue = parseFloat(data.replace('%', ''));
        const decimalValue = percentValue / 100;
        setPromoPercent(decimalValue);
      }
    })
    .catch(error => {
      // Handle error
      console.error('There was a problem with the fetch operation:', error);
    });
};

  return (
    <div className="CheckoutUI">
      <div className="LeftSection">
        {/* Left Section - Promotion Code */}
        <h2>Promotion Code</h2>
        <div className="PromotionCodeInput">
          <input type="text" placeholder="Enter code" value={promoInput} onChange={(e)=>setPromoInput(e.target.value)} />
          <button_1 onClick={handlePromoClick}>Apply</button_1>
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
            <span>Movie:</span> {movieTitle}
          </div>
          <div>
            <span>Date:</span> {selectedDate}
          </div>
          <div>
            <span>Time:</span> {selectedTime}
          </div>
          <div>
            <span>Seats:</span>
          </div>
          <div>
            <span>Adult Tickets:</span> {adultTickets}
          </div>
          <div>
            <span>Child Tickets:</span> {childTickets}
          </div>
          <div>
            <span>Senior Tickets:</span> {seniorTickets}
          </div>
          <div>
            <span>Total:</span> {totalCost.toFixed(2)}
          </div>
        </div>

        <div className="ButtonContainer">
        <button onClick = {handlePlaceOrder} className="ConfirmButton">Place Order </button>
        <button className="CancelButton">Cancel</button>

      </div>
      </div>

    </div>
  );
}

export default CheckoutUI;
