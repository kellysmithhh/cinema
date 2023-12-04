import React from 'react';
import './ShowtimeSelection.css';
import { useNavigate, useLocation } from 'react-router-dom';

function ShowtimeSelection() {
  const location = useLocation();
  const movie = location.state;
  const movieTitle = movie.info.title;
  const movieTime = movie.showTimes;
  console.log(location.state);
  console.log(movieTime);

  let navigate = useNavigate();
  const routeChange = (selectedDate, selectedTime, movieTitle, movieID) => {
    navigate('/TicketPage', {
      state: { selectedDate, selectedTime, movieTitle, movieID },
    });
  };

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    console.log('Original Date:', dateTimeString);
    console.log('Formatted Date:', dateTime.toLocaleString('en-US'));
    return dateTime.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className="ShowtimeSelection">
      <h4>Showtimes</h4>
      <div className="movie-title">{movieTitle}</div>
      {movieTime.map((dateTimeString, index) => {
        const formattedDateTime = formatDateTime(dateTimeString);
        return (
          <button
            key={index}
            onClick={() => routeChange(formattedDateTime, movieTitle, movie.info.id)}
            className="showtime-button"
          >
            {formattedDateTime}
          </button>
        );
      })}
    </div>
  );
}

export default ShowtimeSelection;
