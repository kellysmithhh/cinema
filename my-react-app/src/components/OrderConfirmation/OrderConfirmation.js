import React from 'react';
import './OrderConfirmation.css';

function OrderConfirmation(props) {
  const {
    confirmationNumber = '',
    movieName = '',
    dateTime = '',
    selectedSeats = [],
    ticketTypes = [],
    totalCost = 0,
  } = props;

  return (
    <div className="OrderConfirmation">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been confirmed with the following details:</p>

      <div className="ConfirmationDetails">
        <p>Confirmation Number: {confirmationNumber}</p>
        <p>Movie: {movieName}</p>
        <p>Date & Time: {dateTime}</p>
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <p>Ticket Types: {ticketTypes.join(', ')}</p>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
      </div>

      <p>An email receipt has been sent to your email address.</p>

      <button>Confirm</button>
    </div>
  );
}

export default OrderConfirmation;
