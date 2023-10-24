import { useNavigate } from "react-router-dom";

function ChangePassword() {

    let navigate = useNavigate();

    const handleEnterClick = () => {
         //change path
         let path = `/`; 
         navigate(path);
    }
    return (
        <div className="LoginPage">
        <form action="">
        <div className="LogIn">
               <h1>Change Password</h1>
           </div>
           <input type="text" placeholder="New Password" id="email" name="email" ></input>
           <input type="text" placeholder="Confirm New Password" id="email" name="email" ></input>
           <div className="input-container5">
               <button onClick = {handleEnterClick} type="submit">Enter</button>
           </div>
        </form>
  </div>
);


}

export default ChangePassword;