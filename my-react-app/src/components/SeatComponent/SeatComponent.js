import React, { useState } from 'react';

function SeatComponent(props) {
    const row = props.newSeat.seat.seat.seatRow;
    const fun = props.newSeat.seatFunction;
    const status = props.newSeat.seat.seat.status;
    const column = props.newSeat.seat.seat.seatColumn;
    const showId = props.newSeat.seat.seat.showInfo;
    var isTaken = false;
  
    const [isRed, setIsRed] = useState(true);
    

  //console.log(props.newSeat.seat.seat);

    const handleClick = () => {      
      if (isTaken === false) {
        isTaken = true; 
        setIsRed(false);
      } else {
          isTaken = false;
      }
        fun(row, column, isTaken, showId);
      
    };
  
    if (status === false) {

      return (
        <div>
          {/* This seat is selectable */}
          <button style={{backgroundColor: isRed === true ? "red": "green"}} onClick={handleClick}>
            {row}, {column}
          </button>
        </div>
      );
    } else {
      return (
        <div>
          Taken
          {/* Make this one non-selectable */}
          {row}
          {column}
        </div>
      );
    }
  }
  
  export default SeatComponent;