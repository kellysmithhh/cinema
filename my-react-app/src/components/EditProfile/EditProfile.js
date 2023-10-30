import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import PaymentCards from '../PaymentCards/PaymentCards';
import './EditProfile.css';

function EditProfile() {
    const[paymentCards,setPaymentCards] = useState([])  
    const [paymentBillingAddress,setPaymentBillingAddress] = useState([])
    const paymentList = paymentCards.map((cards, k) => <PaymentCards cards = {cards} key ={k}/>);  
    const[firstName,setFirst_name] = useState('')
    const[lastName,setLast_name] = useState('')

    const[email,setEmail] = useState('')
    const[phone,setPhoneNum] = useState('')
    const[password,setPassword] = useState('')

    const[street,setStreet] = useState('')
    const[city,setCity] = useState('')
    const[state,setState] = useState('')
    const[zipCode,setZip] = useState('')

    const[Newstreet,setNewStreet] = useState('')
    const[Newcity,setNewCity] = useState('')
    const[Newstate,setNewState] = useState('')
    const[NewzipCode,setNewZip] = useState('')

    const[cardType,setCardType] = useState('')
    const[cardNumber,setCardNum] = useState('')
    const[cardExpiration,setExpiration] = useState('')
    const[cardCVV,setCardCVV] = useState('')
    const[cardName,setCardName] = useState('')


    let navigate = useNavigate(); 

    const[promoEmail,setPromoEmail] = useState(Boolean);

    const handleAddCardClick = (e) => {
      e.preventDefault();
    }

    useEffect(() => {
      console.log("promoEmail changed: " + promoEmail);
    }, [promoEmail]);

      if (firstName === "") {
      var session = localStorage.getItem('session');
      session = session.replace(/^"(.*)"$/, '$1');
      //console.log(session);
       const apigetURL = `http://localhost:8080/user/get/user/${session}`;
       fetch(apigetURL, {
         //mode: 'no-cors',
         method:"GET",
         headers:{"Content-Type":"application/json"}})
         .then((response)=> response.json())
         .then((data) => {
          //console.log(data); 
                  
           setFirst_name(data.firstName)
           setLast_name(data.lastName)
           setPhoneNum(data.phone)
           setCity(data.shippingAddress.city)
           setState(data.shippingAddress.state)
           setStreet(data.shippingAddress.street)
           setZip(data.shippingAddress.zipCode)
           setPaymentCards(data.paymentCards)      
           setEmail(data.email)
           
           console.log("completed")
         })
         .catch(error => {
           console.error('Error fetching data:', error);
       });              
      }
      
      useEffect(() => {
      console.log("before fetch:" + promoEmail)
      const apiUrl = `http://localhost:8080/user/check/promotions/${session}`;
      fetch(apiUrl, {
        method:"GET",
        headers:{"Content-Type":"application/json",}})
        .then((response)=> response.json())
        .then((data) => {
          console.log("Data from the fetch:", data);
          if (data === true) {
            setPromoEmail(true);
            console.log("Inside if: " + promoEmail)
          }
          console.log("defaultCheck: " + promoEmail)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
      });
      }, []);


    const handleCheck = (e) => {
      setPromoEmail(e.target.checked)

      var session = localStorage.getItem("session");
      session = session.replace(/^"(.*)"$/, '$1');     
      const userPromoEmail = {promoEmail: e.target.checked,session}
      console.log("checked: " + promoEmail) 

      fetch("http://localhost:8080/user/edit",{ 
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(userPromoEmail)
      }).then(()=>{
        console.log("user edits added.")
        console.log(userPromoEmail)
      })
      // reflect changes in db
    }

    const handleFnameclick = (e) => {
      e.preventDefault();
      var session = localStorage.getItem("session");
      session = session.replace(/^"(.*)"$/, '$1');     
       const userFName = {firstName,session}
       e.preventDefault();
       fetch("http://localhost:8080/user/edit",{ //route not implemented yet
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(userFName)
       }).then(()=>{
           console.log("user edits added.")
       })
       //window.location.reload()

    }

    const handleLnameclick = (e) => {
      e.preventDefault();
      var session = localStorage.getItem("session");
      session = session.replace(/^"(.*)"$/, '$1');     
       const userLName = {lastName,session}
       e.preventDefault();
       fetch("http://localhost:8080/user/edit",{ //route not implemented yet
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(userLName)
       }).then(()=>{
           console.log("user edits added.")
       })
    }

    const handlePasswordclick = (e) => {
      e.preventDefault();
      var oldPass = prompt("Enter Old Password")  

      var session = localStorage.getItem("session");
      session = session.replace(/^"(.*)"$/, '$1');     
          
      const apiUrl = `http://localhost:8080/user/verify/${session}/${oldPass}`;       
       fetch(apiUrl,{
           method:"GET",
           headers:{"Content-Type":"application/json"}           
       }).then((response)=> response.text())
       .then((data)=>{
        console.log("db returned: " + data)
        if (data === "true") {
          const userNewPass = {password,session}
          fetch("http://localhost:8080/user/edit",{ //route not implemented yet
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(userNewPass)
          }).then(()=>{
              console.log("user edits added.")
          })            
        } // if
       })
            
    }

    const handlePhoneclick = (e) => {
      e.preventDefault();
      var session = localStorage.getItem("session");
      session = session.replace(/^"(.*)"$/, '$1');     
       const userPhone = {phone,session}
       e.preventDefault();
       fetch("http://localhost:8080/user/edit",{ //route not implemented yet
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(userPhone)
       }).then(()=>{
           console.log("user edits added.")
       })
    }

    const handleShippingclick = (e) => {
      e.preventDefault();
      var session = localStorage.getItem("session");
      session = session.replace(/^"(.*)"$/, '$1');
      if ((street || city || state || zipCode) !== '') {
        var shippingAddress={street,city,state,zipCode}
        console.log(shippingAddress)
      }             
      const userShipping = {shippingAddress,session}
       e.preventDefault();
       fetch("http://localhost:8080/user/edit",{ //route not implemented yet
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(userShipping)
       }).then(()=>{
           console.log("user edits added.")
       })
    }
    

    const handleClick = () =>{
      var shippingAddress;
      if ((street || city || state || zipCode) !== '') {
          shippingAddress={street,city,state,zipCode}
          console.log(shippingAddress)
      }  

      var session = localStorage.getItem('session')
      session = session.replace(/^"(.*)"$/, '$1');
      // dosen't work rn cuz if you dont enter a field it changes the users data to "" instead of keeping old info
      const user={firstName,lastName,password,phone,shippingAddress,session}
      console.log(user)
      fetch("http://localhost:8080/user/edit",{ //route not implemented yet
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(user)
      }).then(()=>{
          console.log("user edits added.")
      })
    } //handleClick


    return (
      <div className="EditProfile">
        <form action="">
            <h1>Edit Profile</h1>
            <p>{email}</p>
  
          <div className="form-group">            
            <label className="labele">First Name:</label>            
            <input type="text" placeholder= {firstName} id="name" name="name" onChange={(e)=>setFirst_name(e.target.value)}></input>
            <button type="submit" onClick = {handleFnameclick}>Update</button>
          </div>
  
          <div className="form-group">          
            <label className="label">Last Name:</label>
            <input type="text" placeholder={lastName} id="name1" name="name1" onChange={(e)=>setLast_name(e.target.value)}></input>
            <button type="submit" onClick = {handleLnameclick}>Update</button>
          </div>
  
          <div className="form-group">
            <label className="labele">Password:</label>
            <input type="text" placeholder="New Password" id="pwd" name="pwd" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button type="submit" onClick = {handlePasswordclick}>Update</button>
          </div>
  
          <div className="form-group">          
            <label className="labele">Phone Number:</label>
            <input type="text" placeholder={phone} id="phone" name="phone" onChange={(e)=>setPhoneNum(e.target.value)}></input>
            <button type="submit" onClick = {handlePhoneclick}>Update</button>
          </div>
  
          <label className="label"> New Shipping Address </label>
                <input type="text" placeholder={street} id="str" name="str"  onChange={(e)=>setStreet(e.target.value)}></input>
                <input type="text" placeholder={city} id="city" name="city"  onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder={state} id="state" name="state" onChange={(e)=>setState(e.target.value)}></input>
                <input type="text" placeholder={zipCode} id="zip" name="zip"  onChange={(e)=>setZip(e.target.value)}></input>
                <button type="submit" onClick = {handleShippingclick}>Update Shipping Address</button>

                <div class="checkbox-label2">
                    <input type="checkbox" id="Promotional" name="Promotional" onChange={handleCheck} checked={promoEmail}/>
                    <label for="scales">I would like to receive emails about promotional codes.</label>
                </div>
          <div>

          <label> Edit payment card</label>
          <div>
                    {paymentList}
          </div>
          </div>

          <div>
          <label> Add payment card</label>
          <input type="text" placeholder="Card Type" id="ct" name="ct" value={cardType} onChange={(e)=>setCardType(e.target.value)}></input>
                <input type="text" placeholder="Card Number" id="cn" name="cn" value={cardNumber} onChange={(e)=>setCardNum(e.target.value)}></input>
                <input type="text" placeholder="Expiration Date" id="ed" name="ed" value={cardExpiration} onChange={(e)=>setExpiration(e.target.value)}></input>
                <input type="text" placeholder="Card Name" id="cname" name="cname" value={cardName} onChange={(e)=>setCardName(e.target.value)}></input>
                <input type="text" placeholder="Card CVV" id="CVV" name="CVV" value={cardCVV} onChange={(e)=>setCardCVV(e.target.value)}></input>
                
                <label className="label">Billing Address </label>
                <input type="text" placeholder="Billing Street" id="bs" name="bs" value={Newstreet} onChange={(e)=>setStreet(e.target.value)}></input>
                <input type="text" placeholder="Billing City" id="bc" name="bc" value={Newcity} onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder="Billing State" id="bstate" name="bstate" value={Newstate} onChange={(e)=>setState(e.target.value)}></input>
                <input type="text" placeholder="Billing Zip" id="bz" name="bz" value={NewzipCode} onChange={(e)=>setZip(e.target.value)}></input>
                <button className="submit-button" type="submit" onClick={handleAddCardClick}>Add card</button>
          </div>
          <div className="input-container">
          </div>
        </form>
      </div>
    );
  }
  
  

export default EditProfile;