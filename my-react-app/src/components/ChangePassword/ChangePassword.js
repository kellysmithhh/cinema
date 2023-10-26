import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ChangePassword() {

    let navigate = useNavigate();
    const[newPassword,setNewPassword] = useState('');
    const {email} = useParams();

    const handleEnterClick = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/user/forgotPassword/${email}/${newPassword}`,{ 
            method:"POST",
            headers:{"Content-Type":"application/json"},
        }).then(()=>{
            console.log("Password changed.")

            //change path
            let path = `/`; 
            navigate(path);
        })
    }
    return (
        <div className="LoginPage">
        <form action="">
        <div className="LogIn">
               <h1>Change Password</h1>
           </div>
           <input type="text" placeholder="New Password" value = {newPassword} onChange={(e)=>setNewPassword(e.target.value)}></input>
           <div className="input-container5">
               <button onClick = {handleEnterClick} type="submit">Enter</button>
           </div>
        </form>
  </div>
);


}

export default ChangePassword;