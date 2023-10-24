import { useNavigate } from "react-router-dom";

function VerifyCode() {

    let navigate = useNavigate();

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
           <input type="text" placeholder="Email" id="email" name="email" ></input>

           <div className="input-container5">
               <button onClick = {handleEnterVerifyClick} type="submit">Enter</button>
           </div>
        </form>
  </div>
);


}

export default VerifyCode;