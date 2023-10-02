import './RegistrationConfirmation.css';
import { useNavigate } from 'react-router-dom';



function RegistrationConfirmation() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/RegisterConfirmation`; 
        navigate(path);
    }

    return (
        <div className="RegistrationConfirmation">
        <form action="">
           <div className="ThankYou">
               <h1>Thank You!</h1>
           </div>
           <label1 className="label1">You have successfully registered</label1>

           <div className="input-container">
               <button type="submit" onSubmit={routeChange}>Sign In</button>
           </div>
        </form>
  </div>
);
}

export default RegistrationConfirmation;