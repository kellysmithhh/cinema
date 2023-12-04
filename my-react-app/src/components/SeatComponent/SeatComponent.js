function SeatComponent(props) {
    const row = props.newSeat.seat.seat.seatRow;
    const fun = props.newSeat.seatFunction;
    const status = props.newSeat.seat.seat.status;
    const column = props.newSeat.seat.seat.seatColumn;
    const showId = props.newSeat.seat.seat.showId;
    var isTaken = false;

    const handleClick = () => {      
      if (isTaken === false) {
        
         isTaken = true; 
      } else {
          isTaken = false;
      }
        fun(row, column, isTaken,showId);
      
    };
  
    if (status === false) {
      return (
        <div>
          {/* This seat is selectable */}
          <button onClick={handleClick}>
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