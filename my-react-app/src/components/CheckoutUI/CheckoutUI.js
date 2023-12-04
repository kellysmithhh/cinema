import React, { useEffect, useState } from 'react';
import './CheckoutUI.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import PaymentCards from '../PaymentCards/PaymentCards';

function CheckoutUI() {

  let navigate = useNavigate(); 
  const[email,setEmail] = useState('');

  const location = useLocation();
  const { selectedDate, selectedTime, movieTitle, childTickets, adultTickets, seniorTickets, tickets, movieId } = location.state;
  const adultCost = 12.99 * adultTickets;
  const childCost = 10.99 * childTickets;
  const seniorCost = 11.99 * seniorTickets;
  const finalTickets = tickets;
  const ticketTypesCount = {
    child: childTickets,
    adult: adultTickets,
    senior: seniorTickets
  };
  const[totalCost,setTotalCost] = useState(adultCost + childCost + seniorCost);
  const[promoInput,setPromoInput] = useState('');
  const[promoPercent,setPromoPercent] = useState('');
  //const[paymentCards,setPaymentCards] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [cardNames, setCardNames] = useState([]);

  const[Newstreet,setNewStreet] = useState('')
    const[Newcity,setNewCity] = useState('')
    const[Newstate,setNewState] = useState('')
    const[NewzipCode,setNewZip] = useState('')

    const[cardType,setCardType] = useState('')
    const[cardNumber,setCardNum] = useState('')
    const[cardExpiration,setExpiration] = useState('')
    const[cardCVV,setCardCVV] = useState('')
    const[cardName,setCardName] = useState('')

    const handleAddCardClick = (e) => {
      e.preventDefault();
      var session = localStorage.getItem('session');
      session = session.replace(/^"(.*)"$/, '$1');
      var billingAddress = {street: Newstreet, city: Newcity, state: Newstate, zipCode: NewzipCode}
      const paymentCard = {cardNumber,cardExpiration,cardName,cardCVV,cardType,billingAddress}
      const paymentCards = [...cardNames, paymentCard];
      const user = {paymentCards,session}
      fetch("http://localhost:8080/user/edit",{ //route not implemented yet
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(user)
       }).then(()=>{
           console.log("user edits added.")
           window.location.reload();
       })
    }

  useEffect(() => {
    var session = localStorage.getItem('session');
    session = session.replace(/^"(.*)"$/, '$1');
    const apigetURL = `http://localhost:8080/user/get/user/${session}`;
     fetch(apigetURL, {
       method:"GET",
       headers:{"Content-Type":"application/json"}})
       .then((response)=> response.json())
       .then((data) => { 
          setEmail(data.email)
          console.log(data.paymentCards)
          setCardNames(data.paymentCards.map(card => card.cardName));
          setLoading(false);
       })
       .catch(error => {
         console.error('Error fetching data:', error);
     });     
     
     // map ticket types
     const mappedTickets = finalTickets.map((ticket, index) => {
      let ticketType = '';
      Object.keys(ticketTypesCount).some(type => {
        if (ticketTypesCount[type] > 0) {
          ticketTypesCount[type]--;
          ticketType = type;
        }
        console.log(ticketType);
      });
      // Handle mapped tickets here if necessary
    });
  }, []);

  useEffect(() => {
    if (promoPercent !== "code not present") {
      const discountedCost = totalCost - (totalCost * promoPercent);
      setTotalCost(discountedCost);
    }
  }, [promoPercent]);

    const handlePlaceOrder = (e) => {
      e.preventDefault();

      // create ticket objects
      const data = tickets.map(ticket => ({
        row: ticket.row,
        col: ticket.col,
        showId: ticket.showId,
        childTickets: childTickets, 
        adultTickets: adultTickets, 
        seniorTickets: seniorTickets, 
      }));
      fetch('http://localhost:8080/showing/set/ticket/types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Handle success
          console.log('Request successful');
        })
        .catch(error => {
          // Handle error
          console.error('There was a problem with the fetch operation:', error);
        });

      // fetch that sets seats to false and creats a booking with all needed data

      // confirmation email
      fetch(`http://localhost:8080/email/send/order/confirmation/${email}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
    }).then(()=>{
        console.log("New movie added.")
    });

      let path = `/OrderConfirmation`; 
      navigate(path);
    } // handlePlaceOrder

    const handlePromoClick = (e) => {
      e.preventDefault();
      // fetch to check for promocode in db
  fetch(`http://localhost:8080/promotions/check/promo/${promoInput}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success
      return response.text(); // Return the promise for further chaining
    })
    .then(data => {
      if (data === "code not present") {
        alert("code not present.")
      } else {
        const percentValue = parseFloat(data.replace('%', ''));
        const decimalValue = percentValue / 100;
        setPromoPercent(decimalValue);
      }
    })
    .catch(error => {
      // Handle error
      console.error('There was a problem with the fetch operation:', error);
    });
};

  return (
    <div className="CheckoutUI">
      <div className="LeftSection">
        {/* Left Section - Promotion Code */}
        <h2>Promotion Code</h2>
        <div className="PromotionCodeInput">
          <input type="text" placeholder="Enter code" value={promoInput} onChange={(e)=>setPromoInput(e.target.value)} />
          <button_1 onClick={handlePromoClick}>Apply</button_1>
        </div>
      </div>

      <div className="MiddleSection">
        {/* Middle Section - Credit Card Information */}
        <h2>Credit Cards</h2>
        <form>
          {loading ? (
            // Render a loading message or spinner while fetching data
            <p>Loading payment details...</p>
          ) : cardNames.length > 0 ? (
            // Render the card names dropdown when available
            <select>
              {cardNames.map((cardName, index) => (
                <option key={index}>{cardName}</option>
              ))}
            </select>
          ) : (
            // Render the fields to add a new card if no cards are available
            <>
              <h2> Add payment card</h2>
          
          <div className='form-group'>
            <label className="labele">Card Type:</label>
            <input type="text" placeholder="Card Type" id="ct" name="ct" value={cardType} onChange={(e)=>setCardType(e.target.value)}></input>
          </div>
         
          <div className='form-group'>
              <label className="labele">Card Number:</label>
              <input type="text" placeholder="Card Number" id="cn" name="cn" value={cardNumber} onChange={(e)=>setCardNum(e.target.value)}></input>
          </div>

          <div className='form-group'>
            <label className="labele">Expiration Date:</label>
            <input type="text" placeholder="Expiration Date" id="ed" name="ed" value={cardExpiration} onChange={(e)=>setExpiration(e.target.value)}></input>
          </div>

          <div className='form-group'>
            <label className="labele">Card Name:</label>
            <input type="text" placeholder="Card Name" id="cname" name="cname" value={cardName} onChange={(e)=>setCardName(e.target.value)}></input>
          </div>
                
          <div className='form-group'>
            <label className="labele">Card CVV:</label>
            <input type="text" placeholder="Card CVV" id="CVV" name="CVV" value={cardCVV} onChange={(e)=>setCardCVV(e.target.value)}></input>
          </div>
                

                <br></br>
                
                <h3>Billing Address </h3>

                <div className='form-group'>
                  <label className="labele">Billing Street: </label>
                  <input type="text" placeholder="Billing Street" id="bs" name="bs" value={Newstreet} onChange={(e)=>setNewStreet(e.target.value)}></input>
                </div>

                <div className='form-group'>
                  <label className="labele">New City: </label>
                  <input type="text" placeholder="Billing City" id="bc" name="bc" value={Newcity} onChange={(e)=>setNewCity(e.target.value)}></input>
                </div>
                
                <div className='form-group'>
                  <label className="labele">New State: </label>
                  <input type="text" placeholder="Billing State" id="bstate" name="bstate" value={Newstate} onChange={(e)=>setNewState(e.target.value)}></input>
                </div>
                
                <div className='form-group'>
                  <label className="labele">New Zip: </label>
                  <input type="text" placeholder="Billing Zip" id="bz" name="bz" value={NewzipCode} onChange={(e)=>setNewZip(e.target.value)}></input>
                </div>
                
              <button className="AddCard" onClick={handleAddCardClick}> Add Card</button>
            </>
          )}

          {/* Rest of the form fields */}
          {/* ... */}
        </form>
        
      </div>

      <div className="RightSection">
        {/* Right Section - Order Summary */}
        <h2>Order Summary</h2>
        <div className="OrderSummaryList">
          <div>
            <span>Movie:</span> {movieTitle}
          </div>
          <div>
            <span>Date:</span> {selectedDate}
          </div>
          <div>
            <span>Time:</span> {selectedTime}
          </div>
          <div>
            <span>Seats:</span>
          </div>
          <div>
            <span>Adult Tickets:</span> {adultTickets}
          </div>
          <div>
            <span>Child Tickets:</span> {childTickets}
          </div>
          <div>
            <span>Senior Tickets:</span> {seniorTickets}
          </div>
          <div>
            <span>Total:</span> {totalCost.toFixed(2)}
          </div>
        </div>

        <div className="ButtonContainer">
        <button onClick = {handlePlaceOrder} className="ConfirmButton">Place Order </button>
        <button className="CancelButton">Cancel</button>

      </div>
      </div>

    </div>
  );
}

export default CheckoutUI;
