import './LoginPage.css';

function LoginPage() {
    return (
        <div className="LoginPage">
        <form action="">
           <div className="LogIn">
               <h1>Sign In</h1>
           </div>
           <input type="text" placeholder="Email" id="email" name="email"></input>

           <input type="text" placeholder="Password" id="password" name="password"></input>

           <div className="input-container">
               <button type="submit">Sign In</button>
           </div>
        </form>
  </div>
);

}

export default LoginPage;