
app.service('Products',[ function(){

  this.products = [];
  this.checkout = {};
  this.total;

  // TO BE REMOVED
  var images = ['images/polaroid.jpg','images/canon.jpg','images/nikon.jpg','images/leica.jpeg'];
  var prices = [150, 800, 800, 2000];

  for (var i = 0; i < 10; i++) {
    var ind = Math.floor(Math.random() * 4);
    
    var prod         = {};
    prod.id          = i+1;
    prod.title       = 'Polaroid Camera';
    prod.image       = images[ind];
    prod.description = 'A retro camera';
    prod.quantity    = ind+1;
    prod.price       = prices[ind];
    this.products.push(prod);
  }

  this.removeProduct = function(product) {
    this.products.forEach(function(prod, i, collection){
      if (product.id === prod.id) {
        this.products.splice(i, 1);
        updateTotal();
      }
    }.bind(this));
  };

  this.addOneProduct = function(product) {
    product.quantity++;
    updateTotal();
  };

  this.removeOneProduct = function(product) {
    product.quantity--;
    updateTotal();
  };

  this.cartTotal = function() {
    var total = 0;
    this.products.forEach(function(product, index, products){
      total += product.price * product.quantity;
    });

    return formatTotal(total);
  };

  var formatTotal = function(total) {
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  var updateTotal = function(){
    this.total = this.cartTotal();
  }.bind(this);

  updateTotal();

}]);

app.service('checkoutValidation', function(){
   var cardTypes = {
    visa: /^4[0-9]{6,}$/,
    masterCard : /^5[1-5][0-9]{5,}$/,
    amex: /^3[47][0-9]{5,}$/,
    diners : /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/
   };

   var cardTypeImage = {
    visa: '../../images/creditcards/visa.png',
    masterCard: '../../images/creditcards/mastercard.png',
    amex: '../../images/creditcards/amex.png',
    diners: '../../images/creditcards/diners.png',
    discover: '../../images/creditcards/discover.png',
    jcb: '../../images/creditcards/jcb.png'
   };

   this.cardType = function(cc) {
    cc = cc.split(' ').join('');
    for (var cType in cardTypes) {
      if (cardTypes[cType].test(cc)) {
        console.log(cardTypeImage[cType]);
      }
    }
   };

  this.validateCreditCardNumber = function(cc){
    return Stripe.card.validateCardNumber(cc);
  };

  this.validateExpiry = function(month, year){
    return Stripe.card.validateExpiry(month, year);
  };

  this.validateCVC = function(cvc){
    return Stripe.card.validateCVC(cvc);
  };

  this.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  this.checkAll = function(checkoutDetails) {
    for (var input in checkoutDetails) {
      /* Check validation for credit card number */
      if (input === 'cc' && !this.validateCreditCardNumber(checkoutDetails[input])) {
        return false;
      }
      /* Check validation for expiration date on credit card */
      if (input === 'exp' && !this.validateExpiry(checkoutDetails[input].slice(0,2), checkoutDetails[input].slice(3))) {
        return false;
      }
      /* Check validation for cvc number on credit card */
      if (input === 'cvc' && !this.validateCVC(checkoutDetails[input])) {
        return false;
      }

      if (input === 'email' && !this.validateEmail(checkoutDetails[input])) {
        return false;
      }

    }
  }.bind(this);
});

app.service('stripeCheckout',['Products','checkoutValidation' ,'$http', function(Products, checkoutValidation, $http){

  this.processCheckout = function(checkoutDetails){
    var cc    = checkoutDetails.cc;
    var month = checkoutDetails.exp.slice(0,2);
    var year  = checkoutDetails.exp.slice(3);
    var cvc   = checkoutDetails.cvc;

    Stripe.card.createToken({
      number    : cc,
      cvc       : cvc,
      exp_month : month,
      exp_year  : year
    }, stripeResponseHandler);

  };

  var stripeResponseHandler = function(status, response) {
      if (response.error) {
          console.log(response.error);
      } else {
          console.log(response);
          pay(response);
      }
  };

  var pay = function(response) {
    var token = response.id;
    url = '/stripe/pay';
    $http.post(url, {stripeToken: token});
  };

}]);

app.service('googleCheckout',['Products', function(Products){

      // global data
      var data = {};

      // item data
      for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          var ctr = i + 1;
          data["item_name_" + ctr] = item.sku;
          data["item_description_" + ctr] = item.name;
          data["item_price_" + ctr] = item.price.toFixed(2);
          data["item_quantity_" + ctr] = item.quantity;
          data["item_merchant_id_" + ctr] = parms.merchantID;
      }

      // build form
      var form = $('<form/></form>');
      // NOTE: in production projects, use the checkout.google url below;
      // for debugging/testing, use the sandbox.google url instead.
      //form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantID);
      form.attr("action", "https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/" + parms.merchantID);
      form.attr("method", "POST");
      form.attr("style", "display:none;");
      this.addFormFields(form, data);
      this.addFormFields(form, parms.options);
      $("body").append(form);

      // submit form
      this.clearCart = clearCart == null || clearCart;
      form.submit();
      form.remove();
}]);