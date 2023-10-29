import React, { useState } from 'react';

function PaymentCards(props) {
    const payment = props;
    console.log(payment.cards.billingAddress)

    const[street,setStreet] = useState('')
    const[city,setCity] = useState('')
    const[state,setState] = useState('')
    const[zipCode,setZip] = useState('')

    const[cardType,setCardType] = useState('')
    const[cardNumber,setCardNum] = useState('')
    const[cardExpiration,setExpiration] = useState('')
    const[cardCVV,setCardCVV] = useState('')
    const[cardName,setCardName] = useState('')

    const[billingAddress,setBillingAddress] = useState('')

    const handleClick = (e) => {
        e.preventDefault();
        var session = localStorage.getItem("session");
        session = session.replace(/^"(.*)"$/, '$1');
        var user = {}
        fetch("http://localhost:8080/user/edit",{ //route not implemented yet
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(user)
       }).then(()=>{
           console.log("user edits added.")
       })
    }

     return (
        <div className="paymentcard">

                <input type="text" placeholder="Card Type" id="ct" name="ct" value={cardType} onChange={(e)=>setCardType(e.target.value)}></input>
                <input type="text" placeholder="Card Number" id="cn" name="cn" value={cardNumber} onChange={(e)=>setCardNum(e.target.value)}></input>
                <input type="text" placeholder="Expiration Date" id="ed" name="ed" value={cardExpiration} onChange={(e)=>setExpiration(e.target.value)}></input>
                <input type="text" placeholder="Card Name" id="cname" name="cname" value={cardName} onChange={(e)=>setCardName(e.target.value)}></input>
                <input type="text" placeholder="Card CVV" id="CVV" name="CVV" value={cardCVV} onChange={(e)=>setCardCVV(e.target.value)}></input>
                
                <label className="label">Billing Address </label>
                <input type="text" placeholder="Billing Street" id="bs" name="bs" value={street} onChange={(e)=>setStreet(e.target.value)}></input>
                <input type="text" placeholder="Billing City" id="bc" name="bc" value={city} onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder="Billing State" id="bstate" name="bstate" value={state} onChange={(e)=>setState(e.target.value)}></input>
                <input type="text" placeholder="Billing Zip" id="bz" name="bz" value={zipCode} onChange={(e)=>setZip(e.target.value)}></input>
                <button className="submit-button" type="submit" onClick={handleClick}>Submit Card Info</button>

        </div>



    );

}
export default PaymentCards
