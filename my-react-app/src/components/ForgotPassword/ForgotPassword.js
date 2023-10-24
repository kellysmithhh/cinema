import { useNavigate } from "react-router-dom";


function ForgotPassword() {

    let navigate = useNavigate();

    const handleSendEmailClick = () => {
        let path = `/VerifyCode`; 
        navigate(path);
    }

    return (
        <div className="LoginPage">
        <form action="">
        <div className="LogIn">
               <h1>Enter Email</h1>
           </div>
           <input type="text" placeholder="Email" id="email" name="email" ></input>

           <div className="input-container5">
               <button onClick = {handleSendEmailClick} type="submit">Send Email</button>
           </div>
        </form>
  </div>
);


}

export default ForgotPassword;