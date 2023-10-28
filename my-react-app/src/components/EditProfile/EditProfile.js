import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {

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

    useEffect(() => {

      const sessionId = localStorage.getItem('session');
      const trimmedSessionId = sessionId.replace(/^"(.*)"$/, '$1');
      const apiUrl = `http://localhost:8080/user/check/promotions/${trimmedSessionId}`;
      fetch(apiUrl, {
        method:"GET",
        headers:{"Content-Type":"application/json"}})
        .then((response)=> response.json())
        .then((data) => {
          console.log("Data from the fetch:", data);
          if (data === true) {
            setDefaultCheck(true);
          }
          console.log("defaultCheck: " + defaultCheck)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
      });

      const api2Url = `http://localhost:8080/user/get/fname/${trimmedSessionId}`;
      fetch(api2Url, {
        method:"GET",
        headers:{"Content-Type":"application/json"}})
        .then((response)=> response.text())
        .then((data) => {
          console.log("fname:" + data)
          setFirst_name(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
      });

      const api3Url = `http://localhost:8080/user/get/lname/${trimmedSessionId}`;
      fetch(api3Url, {
        method:"GET",
        headers:{"Content-Type":"application/json"}})
        .then((response)=> response.text())
        .then((data) => {
          setLast_name(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
      });

      const api4Url = `http://localhost:8080/user/get/phone/${trimmedSessionId}`;
      fetch(api4Url, {
        method:"GET",
        headers:{"Content-Type":"application/json"}})
        .then((response)=> response.text())
        .then((data) => {
          setPhoneNum(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
      });

    }, []);

    const handleCheck = (e) => {
        setDefaultCheck(e.target.checked);
        console.log("checked: " + defaultCheck) // if starting with checked, value is opposite
      // reflect changes in db
    }

    const handleFnameclick = (e) => {
      e.preventDefault();
    }

    const handleLnameclick = (e) => {
      e.preventDefault();
      
    }

    const handlePasswordclick = (e) => {
      e.preventDefault();
    }

    const handlePhoneclick = (e) => {
      e.preventDefault();
    }

    const handleShippingclick = (e) => {
      e.preventDefault();
    }

    const handleClick = () =>{
      var shippingAddress;
      if ((street || city || state || zipCode) !== '') {
          shippingAddress={street,city,state,zipCode}
          console.log(shippingAddress)
      } 

      if(password !== "") {
        // open a box that makes user enter old password before being able to change to new password

      }

      var sessionId = localStorage.getItem('session')
      const trimmedSessionId = sessionId.replace(/^"(.*)"$/, '$1');
      // dosen't work rn cuz if you dont enter a field it changes the users data to "" instead of keeping old info
      const user={firstName,lastName,password,phone,shippingAddress,trimmedSessionId}
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
            <p>{firstName}</p>
            <label className="labele">First Name:</label>            
            <input type="text" placeholder="New first name" id="name" name="name" value={firstName} onChange={(e)=>setFirst_name(e.target.value)}></input>
            <button type="submit" onClick = {handleFnameclick}>Update</button>
          </div>
  
          <div className="form-group">
          <p>{lastName}</p>
            <label className="label">Last Name:</label>
            <input type="text" placeholder="New last name" id="name1" name="name1" value={lastName} onChange={(e)=>setLast_name(e.target.value)}></input>
            <button type="submit" onClick = {handleLnameclick}>Update</button>
          </div>
  
          <div className="form-group">
            <label className="labele">Password:</label>
            <input type="text" placeholder="New Password" id="pwd" name="pwd" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button type="submit" onClick = {handlePasswordclick}>Update</button>
          </div>
  
          <div className="form-group">
          <p>{phone}</p>
            <label className="labele">Phone Number:</label>
            <input type="text" placeholder="New Phone" id="phone" name="phone" value={phone} onChange={(e)=>setPhoneNum(e.target.value)}></input>
            <button type="submit" onClick = {handlePhoneclick}>Update</button>
          </div>
  
          <label className="label"> New Shipping Address </label>
                <input type="text" placeholder="Street" id="str" name="str" value={street} onChange={(e)=>setStreet(e.target.value)}></input>
                <input type="text" placeholder="City" id="city" name="city" value={city} onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder="State" id="state" name="state" value={state} onChange={(e)=>setState(e.target.value)}></input>
                <input type="text" placeholder="Zip Code" id="zip" name="zip" value={zipCode} onChange={(e)=>setZip(e.target.value)}></input>
                <button type="submit" onClick = {handleShippingclick}>Update Shipping Address</button>

                <div class="checkbox-label2">
                    <input type="checkbox" id="Promotional" name="Promotional" onChange={handleCheck} checked={defaultCheck}/>
                    <label for="scales">I would like to receive emails about promotional codes.</label>
                </div>

          <div className="input-container">
            <button type="submit" onClick = {handleClick}>Update Information</button>
          </div>
        </form>
      </div>
    );
  }
  
  

export default EditProfile;