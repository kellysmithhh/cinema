import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function VerifyCode() {

    let navigate = useNavigate();
    const[inputCode,setInputCode] = useState('');

    const handleEnterVerifyClick = () => {
        let path = `/ChangePassword`; 
        navigate(path);
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