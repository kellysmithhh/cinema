import React from 'react';
import './ShowtimeSelection.css';
import { useNavigate } from 'react-router-dom';

function ShowtimeSelection() {
  const movieTitle = 'Oppenheimer';

  let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/TheaterBooking`; 
      navigate(path);
    }

  const showtimesByDate = [
    {
      date: 'October 3, 2023',
      times: ['1:00 PM', '3:30 PM', '6:00 PM'],
    },
    {
      date: 'October 4, 2023',
      times: ['2:00 PM', '4:30 PM', '7:00 PM'],
    },
    {
      date: 'October 5, 2023',
      times: ['12:30 PM', '3:00 PM', '5:30 PM'],
    },
  ];

  return (
    <div className="ShowtimeSelection">
      <h4>Showtimes</h4>
      <div className="movie-title">{movieTitle}</div>
      {showtimesByDate.map((showtime, index) => (
        <div key={index} className="date-showtimes">
          <div className="showtime-date">{showtime.date}</div>
          <div className="showtime-times">
            {showtime.times.map((time, idx) => (
              <button onClick={routeChange} key={idx} className="showtime-button">
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowtimeSelection;
