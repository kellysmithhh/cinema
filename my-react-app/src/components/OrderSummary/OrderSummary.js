import React from 'react';
import './OrderSummary.css';

function OrderSummary(props) {
  const {
    movieName = '',
    date = '',
    time = '',
    theater = '',
    selectedSeats = [],
    ticketTypes = [],
    priceOfEachTicket = [],
    totalCost = 0,
  } = props;

  return (
    <div className="OrderSummary">
      <h1>Order Summary</h1>
      <p1>Your order has been confirmed with the following details:</p1>

      <div className="SummaryDetails">
        <p>Tickets for {movieName}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <p>Ticket Types: {ticketTypes.join(', ')}</p>
        <p>Price per Ticket: {priceOfEachTicket.join(', ')}</p>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
        
      
    </div>
    <div className="Button-Options">
        <div className='Button1'>
            <button className="update-order-button">Update my Order</button>   
        </div>
        <div className='Button1'>
            <button className="delete-ticket-button">Delete a Ticket</button>
        </div>
        <div className='Button1'>
            <button className="confirm-order-button">Continue to Checkout</button>
        </div>
       
    </div>
        
    </div>
  );
}

export default OrderSummary;
