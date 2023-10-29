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

    const[phone,setPhoneNum] = useState('')
    const[password,setPassword] = useState('')

    const[street,setStreet] = useState('')
    const[city,setCity] = useState('')
    const[state,setState] = useState('')
    const[zipCode,setZip] = useState('')

    let navigate = useNavigate(); 

    const[defaultCheck,setDefaultCheck] = useState(false);
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
          console.log(data); 
                  
           setFirst_name(data.firstName)
           setLast_name(data.lastName)
           setPhoneNum(data.phone)
           setCity(data.shippingAddress.city)
           setState(data.shippingAddress.state)
           setStreet(data.shippingAddress.street)
           setZip(data.shippingAddress.zipCode)
           setPaymentCards(data.paymentCards)
           console.log(data.paymentCards)       
           
           //setPaymentBillingAddress(paymentCards[0].billingAddress)
           //console.log(paymentBillingAddress[0])
           console.log("completed")
         })
         .catch(error => {
           console.error('Error fetching data:', error);
       });              
      }
      
      


    //   const apiUrl = `http://localhost:8080/user/check/promotions/${trimmedSessionId}`;
    //   fetch(apiUrl, {
    //     method:"GET",
    //     headers:{"Content-Type":"application/json",}})
    //     .then((response)=> response.json())
    //     .then((data) => {
    //       console.log("Data from the fetch:", data);
    //       if (data === true) {
    //         setDefaultCheck(true);
    //       }
    //       console.log("defaultCheck: " + defaultCheck)
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //   });

    //   const api2Url = `http://localhost:8080/user/get/fname/${trimmedSessionId}`;
    //   fetch(api2Url, {
    //     method:"GET",
    //     headers:{"Content-Type":"application/json"}})
    //     .then((response)=> response.text())
    //     .then((data) => {
    //       console.log("fname:" + data)
    //       setFirst_name(data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //   });

    //   const api3Url = `http://localhost:8080/user/get/lname/${trimmedSessionId}`;
    //   fetch(api3Url, {
    //     method:"GET",
    //     headers:{"Content-Type":"application/json"}})
    //     .then((response)=> response.text())
    //     .then((data) => {
    //       setLast_name(data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //   });

    //   const api4Url = `http://localhost:8080/user/get/phone/${trimmedSessionId}`;
    //   fetch(api4Url, {
    //     method:"GET",
    //     headers:{"Content-Type":"application/json"}})
    //     .then((response)=> response.text())
    //     .then((data) => {
    //       setPhoneNum(data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //   });

    // }, []);

    const handleCheck = (e) => {
        setDefaultCheck(e.target.checked);
        console.log("checked: " + defaultCheck) // if starting with checked, value is opposite
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
                    <input type="checkbox" id="Promotional" name="Promotional" onChange={handleCheck} checked={defaultCheck}/>
                    <label for="scales">I would like to receive emails about promotional codes.</label>
                </div>
          <div>
          <label> Edit/Add payment card</label>
          <div>
                    {paymentList}
          </div>
          </div>
          <div className="input-container">
            <button type="submit" onClick = {handleClick}>Update Information</button>
          </div>
        </form>
      </div>
    );
  }
  
  

export default EditProfile;