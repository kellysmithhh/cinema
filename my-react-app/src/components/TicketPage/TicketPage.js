import { useNavigate} from 'react-router-dom';

function TicketPage() {
    const tickets = [];
    const selectedTime = searchParams.get('time');
    const selectedDate = searchParams.get('date');

    let navigate = useNavigate();
    const routeChange = (selectedDate, selectedTime) => {
        let path = `/TheaterBooking`;
        navigate(`${path}?date=${selectedDate}&time=${selectedTime}`,{state : tickets});
      };

    return (
      
        <div className="ticket-selector-border"> 
            <div className="ticket-selector">
            <label htmlFor="adultTickets">Adult Tickets ($14.99):</label>
            <input type="number" id="adultTickets" name="adultTickets" min="0" />
            <label htmlFor="childTickets">Child Tickets ($9.99):</label>
            <input type="number" id="childTickets" name="childTickets" min="0" />
            <label htmlFor="seniorTickets">Senior Tickets ($12.99):</label>
            <input type="number" id="seniorTickets" name="seniorTickets" min="0" />
            <button onClick={routeChange(selectedDate,selectedTime)}>Book Tickets</button>
            </div>
        </div>
     
    )
} export default TicketPage