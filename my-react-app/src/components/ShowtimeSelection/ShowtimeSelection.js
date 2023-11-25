import React from 'react';
import './ShowtimeSelection.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function ShowtimeSelection() {
  const location = useLocation();
  const movie = location.state;
  const movieTitle = movie.title
  const movieTime = movie.showTimes 

  let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/TheaterBooking`; 
      navigate(path);
    }

    var allShowTimes = []
    var count = 0;
    for (var i = 0; i < movieTime.length; i++) {
      let dates = movieTime[i].substring(0,10)
      var time = []
      // Extracting hours and minutes from the time string
      const [hours, minutes] = movieTime[i].substring(11, 16).split(':');

      // Convert hours to a 12-hour format
      let formattedHours = hours % 12 || 12; // If hours are 0, convert to 12

      // Determine whether it's AM or PM
      const meridiem = hours >= 12 ? 'PM' : 'AM';

      // Create the formatted time string in 12-hour format
      const formattedTime = `${formattedHours}:${minutes} ${meridiem}`;

      time[0] = formattedTime;             
      
      var dupe = false;
      for (var j = 0; j < allShowTimes.length; j++) {
        if (allShowTimes[j].date === dates) {
          dupe = true
          allShowTimes[j].times.push(movieTime[i].substring(11,16))
        }
      }     
      if(dupe === false) {
        var data = {
          date: dates,
          times: time,
        };
        allShowTimes[count] = data
        count++
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
