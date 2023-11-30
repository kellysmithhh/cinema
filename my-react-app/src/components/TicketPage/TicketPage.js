import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TicketPage() {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state;

  let navigate = useNavigate();

  const routeChange = () => {
    navigate('/TheaterBooking', {
      state: { selectedDate, selectedTime },
    });
  };

  return (
    <div className="ticket-selector-border">
      <div className="ticket-selector">
        {/* Your ticket selection UI */}
        <button onClick={routeChange}>Book Tickets</button>
      </div>
    </div>
  );
}

export default TicketPage;
