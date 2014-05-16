
app.service('Products',[ function(){

  this.products = [];

  var images = ['images/polaroid.jpg','images/canon.jpg','images/nikon.jpg','images/leica.jpeg'];
  var prices = [150, 800, 800, 2000];

  for (var i = 0; i < 6; i++) {
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
      }
    }.bind(this));
  };

  this.addOneProduct = function(product) {
    product.quantity++;
  };

  this.removeOneProduct = function(product) {
    product.quantity--;
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

}]);

app.service('stripeCheckout',['Products', '$http', function(Products, $http){
  /* CHECKOUT FORM */
  this.checkout = {
    firstName : '',
    lastName  : '',
    cc        : '',
    exp       : '',
    cvc       : ''
  };

  this.processCheckout = function(checkoutDetails, responseHandler){
    var cc    = checkoutDetails.cc;
    var month = checkoutDetails.exp.slice(0,2);
    var year  = checkoutDetails.exp.slice(3);
    var cvc   = checkoutDetails.cvc;
    // if (!Stripe.card.validateCardNumber(cc)) return;
    // if (!Stripe.card.validateExpiry(month, year)) return;
    // if (!Stripe.card.validateCVC(cvc)) return;
    Stripe.card.createToken({
      number    : cc,
      cvc       : cvc,
      exp_month : month,
      exp_year  : year
    }, responseHandler);

  };

  this.stripeResponseHandler = function(status, response) {
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