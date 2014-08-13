(function(angular) {
  //Service Module for ionic-shop
  var app = angular.module('ionicShop.services', ['ionic']);
  //PRODUCT SERVICE HOLDING ALL ITEMS
  app.service('Products',['$http', function($http){

    this.galleryProducts = [];
    this.cartProducts = [];
    this.checkout = {};

    this.addToCart = function(product){
      var productInCart = false;
      this.cartProducts.forEach(function(prod, index, prods){
        if (prod.id === product.id) {
          productInCart = prod;
          return;
        }
      });

      if (productInCart) {
        this.addOneProduct(productInCart);
      } else {
        product.purchaseQuantity = 0;
        this.addOneProduct(product);
        this.cartProducts.push(product);
      }
    };

    this.removeProduct = function(product) {
      this.cartProducts.forEach(function(prod, i, prods){
        if (product.id === prod.id) {
          this.cartProducts.splice(i, 1);
          this.updateTotal();
        }
      }.bind(this));
    };

    this.addOneProduct = function(product) {
      --product.quantity;
      ++product.purchaseQuantity;

      this.updateTotal();
    };

    this.removeOneProduct = function(product) {
      ++product.quantity;
      --product.purchaseQuantity;
      this.updateTotal();
    };

    this.cartTotal = function() {
      var total = 0;
      this.cartProducts.forEach(function(prod, index, prods){
        total += prod.price * prod.purchaseQuantity;
      });

      return formatTotal(total);
    };

    var formatTotal = function(total) {
      return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    this.updateTotal = function(){
      this.total = this.cartTotal();
    }.bind(this);

    this.updateTotal();

    this.getProducts = function(callback){
      $http.get('/admin/panel/products')
      .success(function(products){
        this.galleryProducts = products;
        if (callback) {callback();}
      }.bind(this));
    };

  }]);

  //CHECKOUT VALIDATION SERVICE
  app.service('CheckoutValidation', function(){

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
      var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailReg.test(email);
    };

    this.validateZipcode = function(zipcode) {
      var zipReg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      return zipReg.test(zipcode);
    };

    this.checkAll = function(checkoutDetails) {
      if (Object.keys(checkoutDetails).length === 0) { return false; }
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

        if (input === 'zipcode' && !this.validateZipcode(checkoutDetails[input])) {
          return false;
        }
      }
      return true;
    }.bind(this);
  });

  //STRIPE INTEGRATION SERVICE
  app.service('stripeCheckout',['Products','CheckoutValidation' ,'$http', function(Products, CheckoutValidation, $http){
    
    this.setStripeKey = function(key){
      Stripe.setPublishableKey(key);
    };

    this.setStripeTokenCallback = function(){
      
    };

    this.processCheckout = function(checkoutDetails, callback){
      var cc    = checkoutDetails.cc;
      var month = checkoutDetails.exp.slice(0,2);
      var year  = checkoutDetails.exp.slice(3);
      var cvc   = checkoutDetails.cvc;

      Stripe.card.createToken({
        number    : cc,
        cvc       : cvc,
        exp_month : month,
        exp_year  : year
      }, callback);
    };

    this.stripeCallback = function(status, response){
      this.setStripeTokenCallback(status, response);
    }.bind(this);

    var pay = function(response) {
      var token = response.id;
      url = '/stripe/pay';
      $http.post(url, {stripeToken: token});
    };

  }]);

})(angular);