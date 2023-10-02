import {useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/ManagerView`; 
        navigate(path);
    }

    let navigateTwo = useNavigate(); 
    const routeChangeTwo = () =>{ 
        let path = `/CreateAccount`; 
        navigateTwo(path);
    }

    return (
        <div className="LoginPage">
        <form action="">
           <div className="LogIn">
               <h1>Sign In</h1>
           </div>
           <input type="text" placeholder="Email" id="email" name="email"></input>

           <input type="text" placeholder="Password" id="password" name="password"></input>

           <div className="input-container5">
               <button onClick = {routeChange} type="submit">Sign In</button>
               <button onClick = {routeChangeTwo} type="submit">Create Account</button>
           </div>
        </form>
  </div>
);


}

export default LoginPage;