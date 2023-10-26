import React from 'react';
import './AddCard.css';
import { useState } from 'react';

function AddCard() {

    //let path = `/VerifyCode/${verificationCode}/${page}/${email}`; 
      //  navigate(path);

    // PaymentCard
    const[cardType,setCardType] = useState('')
    const[cardNumber,setCardNum] = useState('')
    const[cardExperation,setExperation] = useState('')
    const[cardCVV,setCardCVV] = useState('')
    const[cardName,setCardName] = useState('')

     // Billing Address
     const[billingStreet,setBillingStreet] = useState('')
     const[billingCity,setBillingCity] = useState('')
     const[billingState,setBillingState] = useState('')
     const[billingZip,setBillingZip] = useState('')

    const handleClick = () => {
            var billingAddress = {
                street: billingStreet,
                city: billingCity,
                state: billingState,
                zipCode: billingZip
            }
    
            //var billingAddress  
            
            var paymentCards;      
            if ((cardType || cardNumber || cardExperation) !== '') {            
                paymentCards = {cardNumber,cardExperation,cardName,cardCVV,cardType,billingAddress}
                console.log(paymentCards)   
            } 
        }
    


    return (
        <div className="credit-card-form">
            <h1>Credit Card Information</h1>
            <form>
                
            <label className="label">Payment Info (Optional)</label>
                <input type="text" placeholder="Card Type" id="ct" name="ct" value={cardType} onChange={(e)=>setCardType(e.target.value)}></input>
                <input type="text" placeholder="Card Number" id="cn" name="cn" value={cardNumber} onChange={(e)=>setCardNum(e.target.value)}></input>
                <input type="text" placeholder="Expiration Date" id="ed" name="ed" value={cardExperation} onChange={(e)=>setExperation(e.target.value)}></input>
                <input type="text" placeholder="Card Name" id="cname" name="cname" value={cardName} onChange={(e)=>setCardName(e.target.value)}></input>
                <input type="text" placeholder="Card CVV" id="CVV" name="CVV" value={cardCVV} onChange={(e)=>setCardCVV(e.target.value)}></input>
                
                <label className="label">Billing Address </label>
                <input type="text" placeholder="Billing Street" id="bs" name="bs" value={billingStreet} onChange={(e)=>setBillingStreet(e.target.value)}></input>
                <input type="text" placeholder="Billing City" id="bc" name="bc" value={billingCity} onChange={(e)=>setBillingCity(e.target.value)}></input>
                <input type="text" placeholder="Billing State" id="bstate" name="bstate" value={billingState} onChange={(e)=>setBillingState(e.target.value)}></input>
                <input type="text" placeholder="Billing Zip" id="bz" name="bz" value={billingZip} onChange={(e)=>setBillingZip(e.target.value)}></input>


                <div className="button-group">
                    <button className="submit-button" type="submit">Submit Card Info and Add Another Card</button>
                    <button className="done-button" type="submit">I'm Done Adding Cards</button>
                </div>


            </form>
        </div>
    );
}

export default AddCard;
