const express = require('express');
const router = express.Router();
const {isAuthenticate} = require('../middlewares/auth')
const {processPayment, sendStripeApiKey}  = require('../controllers/paymetController');


router.route('/payment/process').post(isAuthenticate, processPayment);
router.route('/stripeapikey').get(isAuthenticate, sendStripeApiKey)


module.exports  = router;