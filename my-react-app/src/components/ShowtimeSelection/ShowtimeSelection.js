// ShowtimeSelection.jsx

import React from 'react';
import './ShowtimeSelection.css';

function ShowtimeSelection() {
  const movieTitle = 'Oppenheimer';

  // Define showtimes for three different dates
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
      <h2>Showtimes</h2>
      <div className="movie-title">{movieTitle}</div>
      {showtimesByDate.map((showtime, index) => (
        <div key={index} className="date-showtimes">
          <div className="showtime-date">{showtime.date}</div>
          <div className="showtime-times">
            {showtime.times.map((time, idx) => (
              <button key={idx} className="showtime-button">
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
