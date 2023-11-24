

function PromoCodes(props) {
    const promo = props.promo;

    return (

        <div>
            <label>Promotion code: </label>
            {promo.promoCode}
            <label> Percent off: </label>
            {promo.percentOff}
        </div>

    )
} export default PromoCodes