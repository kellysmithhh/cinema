

function PromoCodes(props) {
    const promo = props.promo;

    return (

        <div>
            {promo.promoCode}
            {promo.percentOff}
        </div>

    )
} export default PromoCodes