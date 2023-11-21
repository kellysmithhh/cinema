import { useState } from 'react';
import './ManagePromotions.css'

function ManagePromotions() {

    const [promoCode,setPromoCode] = useState('');
    const [percentOff,setPercentOff] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        const promo = {promoCode, percentOff};
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(promo),
        };

        fetch(`http://localhost:8080/promotions/add`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('There was a problem adding promo', error);
            });
    }

    return (
        <div>
            <h1>Promotions</h1>
            <input type="text" placeholder="Promotion code" id="cpwd" name="cpwd" value = {promoCode} onChange={(e) => setPromoCode(e.target.value)}></input>
            <input type="text" placeholder="Percentage off" id="cpwd" name="cpwd" value = {percentOff} onChange={(e) => setPercentOff(e.target.value)}></input>
            <button type="submit" onClick={handleClick}>Send to customers</button>
        </div>
    )
}

export default ManagePromotions;