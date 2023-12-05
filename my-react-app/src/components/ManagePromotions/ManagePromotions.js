import { useState, useEffect } from 'react';
import './ManagePromotions.css';
import PromoCodes from '../PromoCodes/PromoCodes';

function ManagePromotions() {
    const [promoCode, setPromoCode] = useState('');
    const [percentOff, setPercentOff] = useState('');
    const [allPromoCodes, setAllPromoCodes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/promotions/getAll")
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setAllPromoCodes(result);
            })
            .catch(rejected => {
                console.log(rejected);
            })
    }, [])

    // const promoList = allPromoCodes.map((promo, k) => (
    //     <div className="promo-entry" key={k}>
    //         <label>Promotion code:</label>
    //         <span>{promo.promoCode}</span>
    //         <label>Percent off:</label>
    //         <span>{promo.percentOff}</span>
    //     </div>
    // ));
    const promoList = allPromoCodes.map((promo, k) => (
        <div className="promo-entry" key={k}>
            <div className="promo-column">
                <label>Promotion code:</label>
                <span>{promo.promoCode}</span>
            </div>
            <div className="promo-column">
                <label>Percent off:</label>
                <span>{promo.percentOff}</span>
            </div>
        </div>
    ));
    

    const handleClick = (e) => {
        e.preventDefault();
        const promo = { promoCode, percentOff };
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
                return fetch("http://localhost:8080/promotions/getAll"); // Fetch updated list after successful addition
            })
            .then(res => res.json())
            .then(result => {
                setAllPromoCodes(result); // Update state with the updated list of promotions
            })
            .catch(error => {
                console.error('There was a problem adding promo', error);
            });
    }

    return (
        <div className="manage-promotions-container">
            <div className="promotions-section">
                <h1>Add Promotion</h1>
                <input type="text" placeholder="Promotion code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                <input type="text" placeholder="Percentage off" value={percentOff} onChange={(e) => setPercentOff(e.target.value)} />
                <button type="submit" onClick={handleClick}>Send to customers</button>
            </div>

            <div className="all-promotions-section">
                <h1>All Promotions</h1>
                {promoList}
            </div>
        </div>
    )
}

export default ManagePromotions;