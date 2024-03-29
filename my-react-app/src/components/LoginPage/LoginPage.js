import {useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useState } from 'react';

function LoginPage() {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    let navigate = useNavigate();
    let navigateTwo = useNavigate();

    const handleSignInClick = () => {

        const apiUrl = `http://localhost:8080/user/login/${email}/${password}`
        fetch(apiUrl, {
            method:"POST",
            headers:{"Content-Type":"application/json"}})
            .then(()=>{console.log("")}) // check if login valid 
            .catch(error => {
                console.error('Error fetching data:', error);
              });

            //change path
            let path = `/ManagerView`; 
            navigate(path);
        
    }

    const handleCreateAccountClick = () => {  
            //change route
            let path = `/CreateAccount`; 
            navigateTwo(path);
    }


    return (
        <div className="LoginPage">
        <form action="">
           <div className="LogIn">
               <h1>Sign In</h1>
           </div>
           <input type="text" placeholder="Email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>

           <input type="text" placeholder="Password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>

           <div className="input-container5">
               <button onClick = {handleSignInClick} type="submit">Sign In</button>
               <button onClick = {handleCreateAccountClick} type="submit">Create Account</button>
           </div>
        </form>
  </div>
);


}

export default LoginPage;