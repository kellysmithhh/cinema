import React, {useState, useContext} from 'react';
import './LoginPage.css'

function LoginPage () {

    return (
        <div className="LoginPage">
            <h3>Sign in to access more features of our site!</h3>
   
            <form>
                <div className='credentialsbox'>

                <label for = "userEmail">Email: </label> <br/>
                <input className = "input" type="email"/>
                
                <br/>
                <label for = "userPassword">Password: </label> <br/>
                <input className = "input" type="password" />

                </div>
                <br></br>
                <div className='look'>
                    <button className='accessButton' type = "submit">Login</button>
                </div>
                <p>Need an accout?</p>
            
            </form>
            
        </div>
    );
}

export default LoginPage;