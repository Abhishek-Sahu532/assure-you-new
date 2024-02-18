const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res, next) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency : 'inr',
            metadata : {
                company : 'Ecommerce',
            }
        });
        
        return res.status(200).json({success: true, 
            client_secret : myPayment.client_secret})
  
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
  };


exports.sendStripeApiKey = async(req, res)=>{
    try{
return res.status(200).json({stripeApiKey : process.env.STRIPE_API_KEY});
    }catch(e){
        console.log(e);
        return res.status(500).send(e)
    }
}