import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    // Because stripe excepts the value of price in cents.
    const priceForStripe = price*100;
    const publishablekey = 'pk_test_51J4LA7Bn3M3pkvljekXbzzCUa4oChAWCG4JAOYfwM3sGSMAPc9QBFiSsCBdUEzhUOlFAa33xZ4U7o2shkgFHOm6y00JOTNWmvz';
    const onToken = token => {
        // If we had real payments and a backend, we would pass the 
        // payment token there to process it. 
        console.log(token);
    }

    return (
        <StripeCheckout
            label ='Pay Now'
            name ='Ecommerce Clothin'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />
    )
}

export default StripeCheckoutButton;