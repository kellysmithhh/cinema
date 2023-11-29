

function SeatComponent(props) {

    const seat = props.seat;

    if (seat.status === true) {
    return (
        <div>
            {/* This seat is selectable */}
            {seat.seatRow}
            {seat.seatColumn}
            <button>Select</button>
        </div>
    )
    } else {
        return (
            <div>
                {/* Make this one non selectable */}
                {seat.seatRow} 
                {seat.seatColumn}
                
            </div>

        )
    }

}