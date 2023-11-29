import React from 'react';
import './ShowtimeSelection.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function ShowtimeSelection() {
  const location = useLocation();
  const movie = location.state;
  const movieTitle = movie.title;
  const movieTime = movie.showTimes;

  let navigate = useNavigate();
  const routeChange = (selectedDate, selectedTime) => {
    let path = `/TheaterBooking`;
    navigate(`${path}?date=${selectedDate}&time=${selectedTime}`);
  };

  var allShowTimes = [];
  var count = 0;
  for (var i = 0; i < movieTime.length; i++) {
    let dateTime = new Date(movieTime[i]); // Convert string to a JavaScript Date object

    // Format date
    let formattedDate = dateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    // Format time
    let formattedTime = dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    var dupe = false;
    for (var j = 0; j < allShowTimes.length; j++) {
      if (allShowTimes[j].date === formattedDate) {
        dupe = true;
        allShowTimes[j].times.push(formattedTime);
      }
    }
    if (!dupe) {
      var data = {
        date: formattedDate,
        times: [formattedTime],
      };
      allShowTimes[count] = data;
      count++;
    }
  }

  return (
    <div className="ShowtimeSelection">
      <h4>Showtimes</h4>
      <div className="movie-title">{movieTitle}</div>
      {allShowTimes.map((showtime, index) => (
        <div key={index} className="date-showtimes">
          <div className="showtime-date">{showtime.date}</div>
          <div className="showtime-times">
            {showtime.times.map((time, idx) => (
              <button
                onClick={() => routeChange(showtime.date, time)}
                key={idx}
                className="showtime-button"
              >
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
