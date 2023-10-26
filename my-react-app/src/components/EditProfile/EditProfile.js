import React from 'react';
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
    const handleClick = () =>{
      var shippingAddress;
      if ((street || city || state || zipCode) !== '') {
          shippingAddress={street,city,state,zipCode}
          console.log(shippingAddress)
      } 

      if(password !== "") {
        // open a box that makes user enter old password before being able to change to new password

      }

      var session = localStorage.getItem('sessionID')
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
            <input type="text" placeholder="New First Name" id="name" name="name" value={firstName} onChange={(e)=>setFirst_name(e.target.value)}></input>
          </div>
  
          <div className="form-group">
            <label className="labele">Last Name:</label>
           
            <input type="text" placeholder="New Last Name" id="name1" name="name1" value={lastName} onChange={(e)=>setLast_name(e.target.value)}></input>
          </div>
  
          <div className="form-group">
            <label className="labele">Password:</label>
            
            <input type="text" placeholder="New Password" id="pwd" name="pwd" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
          </div>
  
          <div className="form-group">
            <label className="labele">Phone Number:</label>
            
            <input type="text" placeholder="New Phone" id="phone" name="phone" value={phone} onChange={(e)=>setPhoneNum(e.target.value)}></input>
          </div>
  
          <label className="label"> New Shipping Address </label>
                <input type="text" placeholder="Street" id="str" name="str" value={street} onChange={(e)=>setStreet(e.target.value)}></input>
                <input type="text" placeholder="City" id="city" name="city" value={city} onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder="State" id="state" name="state" value={state} onChange={(e)=>setState(e.target.value)}></input>
                <input type="text" placeholder="Zip Code" id="zip" name="zip" value={zipCode} onChange={(e)=>setZip(e.target.value)}></input>
  
          <div className="input-container">
            <button type="submit" onClick = {handleClick}>Update Information</button>
          </div>
        </form>
      </div>
    );
  }
  
  

export default EditProfile;