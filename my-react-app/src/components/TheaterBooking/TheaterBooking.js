import React, { useEffect } from 'react';
import './TheaterBooking.css';
import { useNavigate, useLocation } from 'react-router-dom';

function TheaterBooking() {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const columns = 10;
  const totalSeats = rows.length * columns;

  const location = useLocation();
  const { selectedDate, selectedTime } = location.state;

  useEffect(() => {
    console.log(selectedDate);
    console.log(selectedTime);
    // fech to get all seats and status
  }, []);

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

  let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/OrderSummary`; 
      navigate(path);
    }

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
            <button onClick={routeChange}>Book Tickets</button>
        </div>
     </div>
);
}


export default TheaterBooking;

