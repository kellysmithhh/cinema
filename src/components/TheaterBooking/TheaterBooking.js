import React from 'react';
import './TheaterBooking.css';

function TheaterBooking() {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const columns = 10;
  const totalSeats = rows.length * columns;

  const createSeatCheckboxes = () => {
    const seatCheckboxes = [];
    for (let i = 1; i <= totalSeats; i++) {
      seatCheckboxes.push(
        <label key={i} className="seat-checkbox">
          <input type="checkbox" />
          {i}
        </label>
      );
    }
    return seatCheckboxes;
  };

  return (
    <div className="TheaterBooking">
       <div className="row-labels">
        {rows.map((row) => (
          <div key={row} className="row-label">
            {row}
          </div>
        ))}
      </div>
      <div className="theater">
        <div className="screen">Movie Screen</div>

        <div className="seat-grid theater-border">{createSeatCheckboxes()}</div> {/* Apply the "theater-border" class */}
      </div>
        <div className="ticket-selector-border"> 
            <div className="ticket-selector">
            <label htmlFor="adultTickets">Adult Tickets ($14.99):</label>
            <input type="number" id="adultTickets" name="adultTickets" min="0" />
            <label htmlFor="childTickets">Child Tickets ($9.99):</label>
            <input type="number" id="childTickets" name="childTickets" min="0" />
            <label htmlFor="seniorTickets">Senior Tickets ($12.99):</label>
            <input type="number" id="seniorTickets" name="seniorTickets" min="0" />
            <button>Book Tickets</button>
        </div>
     </div>
</div>
);
}


export default TheaterBooking;

