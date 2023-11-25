import { Link, useNavigate } from 'react-router-dom';
import './SignedInNavBar.css';
import React from 'react';
  
function SignedInNavBar({handleSignOut}) {

    let navigate = useNavigate(); 

    const handleSignOutClick = () => {
        const sessionId = localStorage.getItem('session');
        const trimmedSessionId = sessionId.replace(/^"(.*)"$/, '$1');
        const apiUrl = `http://localhost:8080/user/logout/${trimmedSessionId}`
            fetch(apiUrl, {
                method:"POST",
                headers:{"Content-Type":"application/json"}})
                .then(()=>{console.log("signed out.")})
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        //handleSignOut()
        navigate('')
    }

    return (
        <div className="NavBar">
            <div className="navbar-flexbox">
                <div className="navbar-body">
                    <h1>
                        <Link to = "/">
                            <h1>Cinema E-Booking</h1>
                        </Link>
                    </h1>
                    

            
                <div className="navbar-buttons">
                        <ul>
                        <li>
                                <Link to = "/Browse">Browse</Link>
                            </li>
                            <li>
                                <Link to = "/EditProfile">Edit Profile</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={handleSignOutClick}>Sign out</Link>
                            </li>

                        
                        </ul>
                    </div>
                </div> 
                
            </div>
        </div>
    );

}

export default SignedInNavBar;