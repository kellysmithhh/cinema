import React from 'react';
import './AddCard.css';

function AddCard() {
    return (
        <div className="credit-card-form">
            <h2>Credit Card Information</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="card-type">Card Type</label>
                    <select id="card-type" name="card-type">
                        <option value="visa">Visa</option>
                        <option value="mastercard">MasterCard</option>
                        <option value="amex">American Express</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="card-number">Card Number</label>
                    <input type="text" id="card-number" name="card-number" placeholder="Card Number" />
                </div>
                <div className="form-group">
                    <label htmlFor="expiry">MM/YY</label>
                    <input type="text" id="expiry" name="expiry" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                    <label htmlFor="billing-address">Billing Address</label>
                    <input type="text" id="billing-address" name="billing-address" placeholder="Billing Address" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" placeholder="City" />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" placeholder="State" />
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode">Zip Code</label>
                    <input type="text" id="zipcode" name="zipcode" placeholder="Zip Code" />
                </div>
                <div className="button-group">
                    <button className="submit-button" type="submit">Submit Card Info and Add Another Card</button>
                    <button className="done-button" type="submit">I'm Done Adding Cards</button>
                </div>
            </form>
        </div>
    );
}

export default AddCard;
