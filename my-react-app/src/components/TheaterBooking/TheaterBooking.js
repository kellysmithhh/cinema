import React, { useEffect,useState } from 'react';
import './TheaterBooking.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SeatComponent from '../SeatComponent/SeatComponent'

function TheaterBooking() {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const columns = 10;
  const totalSeats = rows.length * columns;
  const location = useLocation();
  const { selectedDate, selectedTime, movieTitle, childTickets, adultTickets, seniorTickets, movieID} = location.state;
  const[info,setInfo] = useState([]);  
  let seatList = null;
  const numTickets = parseInt(childTickets) + parseInt(adultTickets) + parseInt(seniorTickets);
  const handleClick = () => {
    console.log("Working");
    console.log(numTickets);
  }  

  let newSeat = {seatRow:2, seatColumn: 3, status: true, seatFunction: handleClick }
  let seat = <SeatComponent seat = {newSeat}/>


  useEffect(() => {
    //console.log(selectedDate);
    //console.log(selectedTime);
    const dateTime = selectedDate +" " + selectedTime;
    const ISOString = new Date(dateTime).toISOString();
    console.log(ISOString);
    //2007-12-03T10:15:30

    fetch(`http:localhost:8080/movie/getSeats/${movieID}?dateTime=${encodeURIComponent(ISOString)}`, {    
    method:"GET",
    headers:{"Content-Type":"application/json"}})
    // .then(res=>res.json())
    .then(data => {
      setInfo(data)
      console.log(data);
      console.log("finished")
    }) 
    // .then((response)=> response.json())
    //      .then((data) => {             
    //        setInfo(data);
           
    //        console.log("completed")
    //      })

    .catch(rejected => {
      console.log(rejected);
    })

    
    //fetch to get all seats and status
   //fetch to get all ticket types and count
  }, [selectedDate, selectedTime]);
 
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
      let path = `/CheckOut`;
      navigate(path, {
        state: { selectedDate, selectedTime, movieTitle, childTickets, adultTickets, seniorTickets },
      });
    }

  return (

    <div>
      {seat}
      <button onClick={routeChange}>Book Tickets</button>
    </div>
    // <div className="TheaterBooking">
    //    <div className="row-labels">
    //     {rows.map((row) => (
    //       <div key={row} className="row-label">
    //         {row}
    //       </div>
    //     ))}
    //   </div>
    //   <div className="theater">
    //     <div className="screen">Movie Screen</div>

    //     <div className="seat-grid theater-border">{createSeatCheckboxes()}</div> {/* Apply the "theater-border" class */}
    //   </div>
    //     <div className="ticket-selector-border"> 
            // <button onClick={routeChange}>Book Tickets</button>
    //     </div>                  

    //  </div>
);
}


export default TheaterBooking;

