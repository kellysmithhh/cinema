import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TicketPage() {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state;
  const[childTickets,setChildTickets] = useState(0);
  const[adultTickets,setAdultTickets] = useState(0);
  const[seniorTickets,setSeniorTickets] = useState(0);

  let navigate = useNavigate();

  const routeChange = (e) => {
    e.preventDefault();
    const data = {
      childTickets: childTickets,
      adultTickets: adultTickets,
      seniorTickets: seniorTickets
    };
    fetch('http://localhost:8080/showing/set/ticket/types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle success
        console.log('Request successful');
      })
      .catch(error => {
        // Handle error
        console.error('There was a problem with the fetch operation:', error);
      });
    navigate('/TheaterBooking', {
      state: { selectedDate, selectedTime },
    });
  };

  return (
    <div className="ticket-selector-border">
      <div className="ticket-selector">
      <label htmlFor="adultTickets">Adult Tickets ($14.99):</label>
            <input type="number" id="adultTickets" name="adultTickets" min="0" value={adultTickets} onChange={(e) => setAdultTickets(e.target.value)}/>
            <label htmlFor="childTickets">Child Tickets ($9.99):</label>
            <input type="number" id="childTickets" name="childTickets" min="0" value={childTickets} onChange={(e) => setChildTickets(e.target.value)}/>
            <label htmlFor="seniorTickets">Senior Tickets ($12.99):</label>
            <input type="number" id="seniorTickets" name="seniorTickets" min="0" value={seniorTickets} onChange={(e) => setSeniorTickets(e.target.value)}/>
        <button onClick={routeChange}>Book Tickets</button>
      </div>
    </div>
  );
}

export default TicketPage;
