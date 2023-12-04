

function SeatComponent(props) {
    const row = props.seat.seatRow;
    const fun = props.seat.seatFunction;
    const status = props.seat.status;
    const column = props.seat.seatColumn;

    if (status === true) {
    return (
        <div>
            {/* This seat is selectable */}
            {row}
            {column}
            <button onClick = {fun}>Select</button>
        </div>
    )
    } else {
        return (
            <div>
                {/* Make this one non selectable */}
                {row}
                {column}                
            </div>

        )
    }

    

} export default SeatComponent