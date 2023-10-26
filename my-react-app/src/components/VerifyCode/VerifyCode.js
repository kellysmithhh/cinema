import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';

function VerifyCode() {
    const {verificationCode} = useParams();
    const {page} = useParams();
    const {email} = useParams();
    let navigate = useNavigate();
    const[inputCode,setInputCode] = useState('');

    const handleEnterVerifyClick = (e) => {
        e.preventDefault();
        if (inputCode === verificationCode && page === "forgotPassword") {
            let path = `/ChangePassword`; 
            navigate(path);
        } else if (inputCode === verificationCode && page === "CreateAccount") {
            const apiUrl = `http://localhost:8080/email/send/confirmation/${email}`;
            fetch(apiUrl, {
                method:"POST",
                headers:{"Content-Type":"application/json"}})
                .then(()=>{console.log("New email sent.")})
                .catch(error => {
                    console.error('Error fetching data:', error);
            });

            let path = `/`;
            navigate(path);
        } else {
            alert("Incorrect code. Please try again.");
        }
    }

    return (
        
        <div className="LoginPage">
        <form action="">
        <div className="LogIn">
               <h1>Enter Code</h1>
           </div>
           <input type="text" placeholder="Code" id="code" name="code" value = {inputCode} onChange={(e)=>setInputCode(e.target.value)}></input>

           <div className="input-container5">
               <button onClick = {handleEnterVerifyClick} type="submit">Enter</button>
           </div>
        </form>
  </div>
);


}

export default VerifyCode;