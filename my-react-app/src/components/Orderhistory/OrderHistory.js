import React, { useEffect } from 'react';

function OrderHistory() {

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
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });  
    }, []);


    return (
        <h2>Order History</h2>
    )

} export default OrderHistory