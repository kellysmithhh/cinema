import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CreateAccount() {
    // User
    const[firstName,setFirst_name] = useState('')
    const[lastName,setLast_name] = useState('')

    // Customer
    const[email,setEmail] = useState('')
    const[phone,setPhoneNum] = useState('')
    const[password,setPassword] = useState('') // don't save as plain text

    //Address
    const[street,setStreet] = useState('')
    const[city,setCity] = useState('')
    const[state,setState] = useState('')
    const[zipCode,setZip] = useState('')

     // PaymentCard
     const[cardType,setCardType] = useState('')
     const[cardNumber,setCardNum] = useState('')
     const[cardExpiration,setExpiration] = useState('')
     const[cardCVV,setCardCVV] = useState('')
     const[cardName,setCardName] = useState('')

     const[paymentCards,setPaymentCards] = useState([])
 
      // Billing Address
      const[billingStreet,setBillingStreet] = useState('')
      const[billingCity,setBillingCity] = useState('')
      const[billingState,setBillingState] = useState('')
      const[billingZip,setBillingZip] = useState('')

    const page = "CreateAccount";
    
    function generateCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    let navigate = useNavigate(); 

    class billingAddress {
        constructor(street, city, state, zipCode) {
            this.street = billingStreet;
            this.city = billingCity;
            this.state = billingState;
            this.zipCode = billingZip;
        }
    }

    class paymentCard {
        constructor(cardNumber, cardExpiration, cardName, cardCVV, cardType, billingAddress) {
            this.cardNumber = cardNumber;
            this.cardExpiration = cardExpiration;
            this.cardName = cardName;
            this.cardCVV = cardCVV;
            this.cardType = cardType;
            this.billingAddress = billingAddress;
        }
    }

    var cardCounter = 0;
    const handlePaymentCardSubmit = (e) => {
        e.preventDefault();
        if (cardCounter === 3) {
            alert("Maximum amount of cards reached");
        } else {
        
            const billingAddr = new billingAddress(billingStreet, billingCity, billingState, billingZip);
            const newPaymentCard =  new paymentCard(cardNumber,cardExpiration,cardName,cardCVV,cardType,billingAddr);
            const updatedPaymentCards = [...paymentCards, newPaymentCard];
            setPaymentCards(updatedPaymentCards);
            console.log(updatedPaymentCards)       
            cardCounter++;
            console.log("card count: " + cardCounter)
        } // else

    }


    const handleClick = (e) =>{
        e.preventDefault();

        if (firstName === '' || lastName === '' || email === '' || phone === '' || password === '') {
            alert("Please fill out all required fields.")
        } else {
            var shippingAddress;
            shippingAddress={street,city,state,zipCode}
            console.log(shippingAddress)

            const user={email,password,firstName,lastName,phone,shippingAddress,paymentCards}
            fetch("http://localhost:8080/user/register",{ 
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            }).then(()=>{
                console.log("New user added.")
                console.log(JSON.stringify(user))
            })
                
            const verificationCode = generateCode();
            const apiUrl = `http://localhost:8080/email/send/${email}/${verificationCode}`;
            fetch(apiUrl, {
                method:"POST",
                headers:{"Content-Type":"application/json"}})
                .then(()=>{console.log("New email sent.")})
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            
            let path = `/VerifyCode/${verificationCode}/${page}/${email}`; 
            navigate(path);
        } // if
    } // handleClick

    return (
       <div className="CreateAccount">
             <form action=""> 
                <h1>Register an Account!</h1>
                <label className="label">First Name</label>
                <input type="text" placeholder="Required Field" id="name" name="name" value={firstName} onChange={(e)=>setFirst_name(e.target.value)}></input>

                <label className="label">Last Name</label>
                <input type="text" placeholder="Required Field" id="name1" name="name1" value={lastName} onChange={(e)=>setLast_name(e.target.value)}></input>

                <label className="label">Email Address</label>
                <input type="text" placeholder="Required Field" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>

                <label className="label">Phone Number</label>
                <input type="text" placeholder="Required Field" id="phone" name="phone" value={phone} onChange={(e)=>setPhoneNum(e.target.value)}></input>

                <label className="label">Password</label>
                <input type="text" placeholder="Required Field" id="pwd" name="pwd" value={password} onChange={(e)=>setPassword(e.target.value)}></input>

                <label className="label">Confirm Password</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd"></input>

                <label className="label">Shipping Address (Optional)</label>
                <input type="text" placeholder="Street" id="str" name="str" value={street} onChange={(e)=>setStreet(e.target.value)}></input>
                <input type="text" placeholder="City" id="city" name="city" value={city} onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder="State" id="state" name="state" value={state} onChange={(e)=>setState(e.target.value)}></input>
                <input type="text" placeholder="Zip Code" id="zip" name="zip" value={zipCode} onChange={(e)=>setZip(e.target.value)}></input>

                <label className="label">Payment Info (Optional)</label>
                <input type="text" placeholder="Card Type" id="ct" name="ct" value={cardType} onChange={(e)=>setCardType(e.target.value)}></input>
                <input type="text" placeholder="Card Number" id="cn" name="cn" value={cardNumber} onChange={(e)=>setCardNum(e.target.value)}></input>
                <input type="text" placeholder="Expiration Date" id="ed" name="ed" value={cardExpiration} onChange={(e)=>setExpiration(e.target.value)}></input>
                <input type="text" placeholder="Card Name" id="cname" name="cname" value={cardName} onChange={(e)=>setCardName(e.target.value)}></input>
                <input type="text" placeholder="Card CVV" id="CVV" name="CVV" value={cardCVV} onChange={(e)=>setCardCVV(e.target.value)}></input>
                
                <label className="label">Billing Address </label>
                <input type="text" placeholder="Billing Street" id="bs" name="bs" value={billingStreet} onChange={(e)=>setBillingStreet(e.target.value)}></input>
                <input type="text" placeholder="Billing City" id="bc" name="bc" value={billingCity} onChange={(e)=>setBillingCity(e.target.value)}></input>
                <input type="text" placeholder="Billing State" id="bstate" name="bstate" value={billingState} onChange={(e)=>setBillingState(e.target.value)}></input>
                <input type="text" placeholder="Billing Zip" id="bz" name="bz" value={billingZip} onChange={(e)=>setBillingZip(e.target.value)}></input>


                <div className="button-group">
                    <button className="submit-button" type="submit" onClick={handlePaymentCardSubmit}>Submit Card Info and Add Another Card</button>
                </div>
                <br></br>
                <div class="checkbox-label2">
                    <input type="checkbox" id="Promotional" name="Promotional"/>
                    <label for="scales">I would like to receive emails about promotional codes.</label>
                </div>
                <br></br>


                <div className="input-container8">
                    <button onClick = {handleClick} type="submit">Register</button>
                </div>
             </form>
       </div>
    );
}

export default CreateAccount;