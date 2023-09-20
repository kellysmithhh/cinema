import './CreateAccount.css';

function CreateAccount() {
    return (
       <div className="CreateAccount">
             <form action="">
                <div className="accLabel">
                    <h1>Register an Account</h1>
                </div>
                <label className="label">First Name</label>
                <input type="text" placeholder="Required Field" id="name" name="name"></input>

                <label className="label">Last Name</label>
                <input type="text" placeholder="Required Field" id="name1" name="name1"></input>

                <label className="label">Email Address</label>
                <input type="text" placeholder="Required Field" id="email" name="email"></input>

                <label className="label">Phone Number</label>
                <input type="text" placeholder="Required Field" id="phone" name="phone"></input>

                <label className="label">Password</label>
                <input type="text" placeholder="Required Field" id="pwd" name="pwd"></input>

                <label className="label">Confirm Password</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd"></input>

                <label className="label">Payment Info (Optional)</label>
                <input type="text" placeholder="Card Type" id="cpwd" name="cpwd"></input>
                <input type="text" placeholder="Card Number" id="cpwd" name="cpwd"></input>
                <input type="text" placeholder="Expiration Date" id="cpwd" name="cpwd"></input>
                <input type="text" placeholder="Billing Address" id="cpwd" name="cpwd"></input>

                <label className="label">Home Address (Optional)</label>
                <input type="text" placeholder="Street" id="cpwd" name="cpwd"></input>
                <input type="text" placeholder="City" id="cpwd" name="cpwd"></input>
                <input type="text" placeholder="State" id="cpwd" name="cpwd"></input>
                <input type="text" placeholder="Zip Code" id="cpwd" name="cpwd"></input>

                <div className="input-container">
                    <button type="submit">Register</button>
                </div>
             </form>
       </div>
    );
}

export default CreateAccount;