import React, { useEffect, useState } from 'react';

function OrderHistory() {
    const[bookings,setBookings] = useState([]);

    useEffect(() => {
        var sessionId = localStorage.getItem('session');
        sessionId = sessionId.replace(/^"(.*)"$/, '$1');
        const apigetURL = `http://localhost:8080/user/booking/get/${sessionId}`;
        fetch(apigetURL, {
        method:"GET",
        headers:{"Content-Type":"application/json"}})
        .then((response)=> response.json())
        .then((data) => { 
            console.log(data);
            setBookings(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });  
    }, []);


    return (
        <div>
            <h2>Order History</h2>
            <div>
                {bookings.map((booking, index) => (
                    <div key={index}>
                        <p>Booking Number: {booking.bookingNumber}</p>
                        <p>Card Used: {booking.cardNumber}</p>
                        <p>Movie: {booking.showInfo.movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )

} export default OrderHistory