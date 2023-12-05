import React, { useEffect,useState } from 'react';
import './TheaterBooking.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SeatComponent from '../SeatComponent/SeatComponent'

function TheaterBooking() {
  const rows = ['1', '2', '3', '4', '5'];
  const columns = 4;
  const totalSeats = rows.length * columns;
  var tickets = []
  const location = useLocation();
  const { selectedDate, selectedTime, movieTitle, childTickets, adultTickets, seniorTickets, movieID} = location.state;  
  var seatList = []
  const [seatInfo,setSeatInfo] = useState([])
  var numTickets = parseInt(childTickets) + parseInt(adultTickets) + parseInt(seniorTickets);
  


  const handleClick = (row,col,isTaken,showId) => { 
    if (isTaken === true && numTickets > 0) {
      let ticket = {row:row, col:col, showId: showId}   
      console.log(ticket)   
      tickets.push(ticket)
      numTickets = numTickets - 1
    } else if (isTaken === false) {
      numTickets = numTickets + 1;
      tickets = tickets.filter((element) => !(element.row === row && element.col === col));
    } else {     
      alert("No tickets remaining");
    }
  }  

  useEffect(() => {    

    const dateTime = selectedDate + " " + selectedTime + " Z";
   
    const ISOString = new Date(dateTime).toISOString();
   
    //2007-12-03T10:15:30
    const url = `http://localhost:8080/movie/getSeats/${movieID}?dateTime=${encodeURIComponent(ISOString)}`;
    

    fetch(url, {    
    //fetch('http://localhost:8080/movie/getSeats/1?dateTime=2023-12-28T17%3A30%3A00.000Z',{
    
    method:"GET",
    headers:{"Content-Type":"application/json"}})
    .then(res=>res.json())
    .then(data => {
      console.log(data) 
      setSeatInfo(data)                
      console.log("finished")
    })    

    .catch(rejected => {
      console.log(rejected);
    })    
      
    //fetch to get all seats and status
   //fetch to get all ticket types and count
  }, [selectedDate, selectedTime]); 

  let navigate = useNavigate(); 

    const routeChange = () =>{ 
      let path = `/CheckOut`;
      navigate(path, {
        state: { selectedDate, selectedTime, movieTitle, childTickets, adultTickets, seniorTickets,tickets },
      });
    }

    for (var i = 0; i < seatInfo.length;i++) {
      seatInfo[i] = {seat:seatInfo[i], seatFunction: handleClick}       
    }
    
    seatList = seatInfo.map((newSeat,k) => <SeatComponent newSeat = {newSeat} key ={k}/>);    
    
  return (

    <div className='TheaterBooking' > 
      <br></br>
      <div className='seat-grid'>
        {seatList}
      </div>
      
      <br></br>
      <button onClick={routeChange}>Book Tickets</button>
    </div>
   
);
}


export default TheaterBooking;

