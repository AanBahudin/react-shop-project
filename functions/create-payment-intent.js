const dotenv = require('dotenv').config()
const stripe = require('stripe')(`${process.env.REACT_APP_STRIPE_SECRET_KEY}`)
exports.handler = async function(event, context) {


    if(event.body) {
        const {cart, shipping_fee, total_amount} = JSON.parse(event.body)

        const calculatePrice = () => {
            return shipping_fee + total_amount
        }

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculatePrice(),
                currency: 'usd'
            })
            return {
                statusCode: 200,
                body: JSON.stringify({clientSecret: paymentIntent.client_secret})
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 401,
                body: JSON.stringify({msg: 'Payment Failed', success: false})
            }
        }

        return {
            statusCode : 200,
            body : JSON.stringify(cart),
        }
    }
    
    return {
        statusCode : 200,
        body : JSON.stringify(cart),
    }
}