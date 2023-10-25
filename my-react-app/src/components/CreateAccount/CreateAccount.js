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

    // PaymentCard
    const[cardType,setCardType] = useState('')
    const[cardNum,setCardNum] = useState('')
    const[expiration,setExperation] = useState('')
    const[billingAddr,setBillingAddr] = useState('')

    //Address
    const[street,setStreet] = useState('')
    const[city,setCity] = useState('')
    const[state,setState] = useState('')
    const[zipCode,setZip] = useState('')
    
    function generateCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    let navigate = useNavigate(); 
    const handleClick = () =>{
        var paymentCard;
        if ((cardType || cardNum || expiration || billingAddr) !== '') {
            paymentCard={cardType,cardNum,expiration,billingAddr}
            console.log(paymentCard)   
        }

        var billingAddress;
        if ((street || city || state || zipCode) !== '') {
            billingAddress={street,city,state,zipCode}
            console.log(billingAddress)
        }     

        const user={firstName,lastName,email,password,phone,cardType,billingAddress}
        console.log(user)
        fetch("http://localhost:8080/user/register",{ //route not implemented yet
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>{
            console.log("New user added.")
        })
        

        //const customer={email,phoneNum,password}
        //console.log(customer)
        /*fetch("http://localhost:8080/customer/add",{ //route not implemented yet
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(customer)
        }).then(()=>{
            console.log("New customer added.")
        })
        */            

        const verificationCode = generateCode();
        const apiUrl = `http://localhost:8080/email/send/${email}/${verificationCode}`;
        fetch(apiUrl, {
            method:"POST",
            headers:{"Content-Type":"application/json"}})
            .then(()=>{console.log("New email sent.")})
            .catch(error => {
                console.error('Error fetching data:', error);
              });
        
       
        let path = `/VerifyCode`; 
        navigate(path);
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

                <label className="label">Payment Info (Optional)</label>
                <input type="text" placeholder="Card Type" id="ct" name="ct" value={cardType} onChange={(e)=>setCardType(e.target.value)}></input>
                <input type="text" placeholder="Card Number" id="cn" name="cn" value={cardNum} onChange={(e)=>setCardNum(e.target.value)}></input>
                <input type="text" placeholder="Expiration Date" id="ed" name="ed" value={expiration} onChange={(e)=>setExperation(e.target.value)}></input>
                <input type="text" placeholder="Billing Address" id="ba" name="ba" value={billingAddr} onChange={(e)=>setBillingAddr(e.target.value)}></input>

                <label className="label">Home Address (Optional)</label>
                <input type="text" placeholder="Street" id="str" name="str" value={street} onChange={(e)=>setStreet(e.target.value)}></input>
                <input type="text" placeholder="City" id="city" name="city" value={city} onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder="State" id="state" name="state" value={state} onChange={(e)=>setState(e.target.value)}></input>
                <input type="text" placeholder="Zip Code" id="zip" name="zip" value={zipCode} onChange={(e)=>setZip(e.target.value)}></input>

                <br></br>
                <div>
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