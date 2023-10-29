

function paymentCards() {

    // const[cardType,setCardType] = useState('')
    // const[cardNumber,setCardNum] = useState('')
    // const[cardExpiration,setExpiration] = useState('')
    // const[cardCVV,setCardCVV] = useState('')
    // const[cardName,setCardName] = useState('')

     return (
        <div className="paymentcard">

        <label className="label">Payment Info</label>
        <input type="text" placeholder="Card Type" id="ct" name="ct" ></input>  
        <input type="text" placeholder="Card Number" id="cn" name="cn" ></input>
        <input type="text" placeholder="Expiration Date" id="ed" name="ed" ></input>
        <input type="text" placeholder="Card Name" id="cname" name="cname" ></input>
        <input type="text" placeholder="Card CVV" id="CVV" name="CVV" ></input>
        <button>Edit Payment</button>
        </div>



    );

}
export default paymentCards
