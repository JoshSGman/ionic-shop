var express = require('express');
var bodyParser = require('body-parser');
var stripe = require('stripe')('sk_test_oY5ApzPlZ1HmDGNrfwkhrkx8');

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser());
app.use(express.static(__dirname + '/www'));


app.post('/stripe/pay', function(req, res){
  console.log(req.body);
  console.log(req.body.stripeToken);
  var stripeToken = req.body.stripeToken;
  var charge = stripe.charges.create({
    amount: 1000000,
    currency: 'usd',
    card: stripeToken,
    description: 'jsgoldberg90test@gmail.com'
  }, function(err, charge){
    if (err && err.type === 'StripeCardError') {
        console.error('Strip Card Error, Your Card Has Been Declined');
    } else {
      console.log('YOU HAS BEEN CHARGED', charge);
    }
    
  });
});

app.listen(port);
console.log('Listening on ' + port);