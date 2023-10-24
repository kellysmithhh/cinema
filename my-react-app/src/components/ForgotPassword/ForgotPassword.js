import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function ForgotPassword() {

    let navigate = useNavigate();

    const[email,setEmail] = useState('')

    function generateCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    const handleSendEmailClick = () => {

        const verificationCode = generateCode();
        const apiUrl = `http://localhost:8080/email/send/${email}/${verificationCode}`;
        fetch(apiUrl, {
            method:"POST",
            headers:{"Content-Type":"application/json"}})
            .then(()=>{console.log("New email sent.")})
            .catch(error => {
                console.error('Error fetching data:', error);
              });

        let path = `/VerifyCode/${verificationCode}`; 
        navigate(path);
    }

    return (
        <div className="LoginPage">
        <form action="">
        <div className="LogIn">
               <h1>Enter Email</h1>
           </div>
           <input type="text" placeholder="Email" id="email" name="email" value ={email} onChange={(e)=>setEmail(e.target.value)}></input>

           <div className="input-container5">
               <button onClick = {handleSendEmailClick} type="submit">Send Email</button>
           </div>
        </form>
  </div>
);


}

export default ForgotPassword;