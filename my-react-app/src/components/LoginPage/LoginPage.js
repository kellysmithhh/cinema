import {useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useState } from 'react';

function LoginPage() {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    let navigate = useNavigate();

    const handleSignInClick = (e) => {
        e.preventDefault();
        if(email.includes('@')) {
            const apiUrl = `http://localhost:8080/user/login/${email}/${password}` // responds with sessionId if found in customer table else null
            fetch(apiUrl, {
                method:"POST",
                headers:{"Content-Type":"application/json"}})
                .then((response)=>response.text())
                .then((data) => {
                    if (data !== '') {
                        let path = `/`;
                        navigate(path);
                    } else {
                        alert("Email or password incorrect. Please try again.")
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            const apiUrl = `http://localhost:8080/user/login/admin/${email}/${password}` // responds with sessionId if found in customer table else null
            fetch(apiUrl, {
                method:"POST",
                headers:{"Content-Type":"application/json"}})
                .then((response)=>response.text())
                .then((data) => {
                    if (data !== '') {
                        //change path
                        let path = `/ManagerView`; 
                        navigate(path);
                    } else {
                        alert("Id or password incorrect. Please try again.")
                    }
                }) 
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        
    }

    const handleCreateAccountClick = () => {  
            //change route
            let path = `/CreateAccount`; 
            navigate(path);
    }

    const handleForgotPasswordClick = () => {
        let path = '/ForgotPassword';
        navigate(path);
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
               <button onClick = {handleForgotPasswordClick} type="submit">Forgot Password</button>
           </div>
        </form>
  </div>
);


}

export default LoginPage;