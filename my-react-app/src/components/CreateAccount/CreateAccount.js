import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CreateAccount() {
    // User
    const[first_name,setFirst_name] = useState('')
    const[last_name,setLast_name] = useState('')

    // Customer
    const[email,setEmail] = useState('')
    const[phoneNum,setPhoneNum] = useState('')
    const[password,setPassword] = useState('') // don't svae as plain text

    // PaymentCard
    const[cardType,setCardType] = useState('')
    const[cardNum,setCardNum] = useState('')
    const[expiration,setExperation] = useState('')
    const[billingAddr,setBillingAddr] = useState('')

    //Address
    const[street,setStreet] = useState('')
    const[city,setCity] = useState('')
    const[state,setState] = useState('')
    const[zip,setZip] = useState('')



    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/RegisterConfirmation`; 
        navigate(path);
    }

    return (
       <div className="CreateAccount">
             <form action=""> 
                <h1>Register an Account!</h1>
                <label className="label">First Name</label>
                <input type="text" placeholder="Required Field" id="name" name="name" value={first_name} onChange={(e)=>setFirst_name(e.target.value)}></input>

                <label className="label">Last Name</label>
                <input type="text" placeholder="Required Field" id="name1" name="name1" value={last_name} onChange={(e)=>setLast_name(e.target.value)}></input>

                <label className="label">Email Address</label>
                <input type="text" placeholder="Required Field" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>

                <label className="label">Phone Number</label>
                <input type="text" placeholder="Required Field" id="phone" name="phone" value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}></input>

                <label className="label">Password</label>
                <input type="text" placeholder="Required Field" id="pwd" name="pwd" value={password} onChange={(e)=>setPassword(e.target.value)}></input>

                <label className="label">Confirm Password</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd"></input>

                <label className="label">Payment Info (Optional)</label>
                <input type="text" placeholder="Card Type" id="ct" name="ct" value={cardType} onChange={(e)=>setCardType(e.target.value)}></input>
                <input type="text" placeholder="Card Number" id="cn" name="cn" value={cardNum} onChange={(e)=>setCardNum(e.target.value)}></input>
                <input type="text" placeholder="Expiration Date" id="ed" name="ed" value={expiration} onChange={(e)=>setExperation(e.target.value)}></input>
                <input type="text" placeholder="Billing Address" id="ba" name="ba" value={billingAddr} onChange={(e)=>setBillingAddr(e.target.value)}></input>

                <label className="label">Home Address (Optional)</label>
                <input type="text" placeholder="Street" id="str" name="str" value={street} onChange={(e)=>setStreet(e.target.value)}></input>
                <input type="text" placeholder="City" id="city" name="city" value={city} onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder="State" id="state" name="state" value={state} onChange={(e)=>setState(e.target.value)}></input>
                <input type="text" placeholder="Zip Code" id="zip" name="zip" value={zip} onChange={(e)=>setZip(e.target.value)}></input>

                <div className="input-container8">
                    <button onClick = {routeChange} type="submit">Register</button>
                </div>
             </form>
       </div>
    );
}

export default CreateAccount;