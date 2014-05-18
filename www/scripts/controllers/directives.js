
//IONIC CART DIRECTIVE
app.directive('ionCart', function(Products){
  var link = function(scope, element, attr) {
    scope.addProduct = function(product) {
      Products.addOneProduct(product);
    };

    scope.removeProduct = function(product){
        product.quantity <= 1 ? Products.removeProduct(product) : Products.removeOneProduct(product);
    };
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/cart-item.html',
    link: link,
    scope: {
      products: '=products'
    }
  };
});

// IONIC CHECKOUT DIRECTIVE
app.directive('ionCheckout', function($state){
  var link = function(scope, element, attr) {

    element.addClass('bar bar-footer bar-dark');
    element.on('click', function(e){
      $state.go('checkout');
    });
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/checkout-footer.html',
    link: link
  };
});

// IONIC PURCHASE DIRECTIVE
app.directive('ionPurchase', function(Products){
  var link = function(scope, element, attr) {
    scope.checkout = Products.checkout;
    //*** Total sum of products in usd by default ***\\
    scope.total = Products.total;
    
    //*** Add address input fields when has-address attribute is on ion-purchase element ***\\
    if (element[0].hasAttribute('has-address')) {scope.hasAddressDir = true;}

    //*** Add email input field when has-email attribute is on ion-purchase element ***\\
    if (element[0].hasAttribute('has-email')) { scope.hasEmailDir = true; }

    //*** Add name input fields when has-name attribute is on ion-purchase element ***\\
    if (element[0].hasAttribute('has-name')) { scope.hasNameDir = true;}
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/purchase.html',
    link: link
  };
});

//IONIC PURCHASE FOOTER DIRECTIVE
app.directive('ionPurchaseFooter', function($compile, Products, stripeCheckout, checkoutValidation){
  var link = function(scope, element, attr) {
    scope.checkout = Products.checkout;
    scope.processCheckout = stripeCheckout.processCheckout;

    element.addClass('bar bar-footer bar-dark');

    element.on('click', function(){
      if (checkoutValidation.checkAll(scope.checkout)) {
        scope.processCheckout(scope.checkout);
      }
      
    });
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/purchase-footer.html',
    link: link
  };
});


//ADDITIONAL CONTENT DIRECTIVES

//CHECKOUT CARD GROUP
app.directive('checkoutCard', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/card-form.html'
  };

});

// CARD NUM INPUT
app.directive('cardNumInput', function(checkoutValidation){
  var link = function(scope, element, attr) {
    scope.onNumBlur = function(){
      if (!checkoutValidation.validateCreditCardNumber(scope.checkout.cc)) {
        scope.checkout.cc = 'Please enter a valid credit card #';
        return;
      }
      checkoutValidation.cardType(scope.checkout.cc);
    };

    scope.onNumFocus = function(){
      if (scope.checkout.cc === 'Please enter a valid credit card #') {
        scope.checkout.cc = '';
      }
    };
  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/card-num-input.html'
  };
});

// CARD EXPIRATION INPUT
app.directive('cardExpInput', function(checkoutValidation){
  var link = function(scope, element, attr) {
    scope.onExpBlur = function(){
      if (!scope.checkout.exp || !checkoutValidation.validateExpiry(scope.checkout.exp.slice(0,2), scope.checkout.exp.slice(3))) {
        scope.checkout.exp = 'Please enter a valid expiration date';
        return;
      }
    };

    scope.onExpFocus = function(){
      if (scope.checkout.exp === 'Please enter a valid expiration date') {
        scope.checkout.exp = '';
      }
    };
  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/card-exp-input.html'
  };

});

//CARD CVC INPUT
app.directive('cardCvcInput', function(checkoutValidation){
  var link = function(scope, element, attr) {
    scope.onCvcBlur = function(){
      if (!checkoutValidation.validateCVC(scope.checkout.cvc)) {
        scope.checkout.cvc = 'Please enter a valid CVC';
        return;
      }
    };

    scope.onCvcFocus = function(){
      if (scope.checkout.cvc === 'Please enter a valid CVC') {
        scope.checkout.cvc = '';
      }
    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/card-cvc-input.html'
  };
});

// ADDRESS GROUP

app.directive('checkoutAddress', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/address.html'
  };

});

//ADDRESS LINE ONE INPUT
app.directive('addressOneInput', function(){
  var link = function(scope, element, attr) {
    scope.onCvcBlur = function(){
      if (!checkoutValidation.validateCVC(scope.checkout.cvc)) {
        scope.checkout.cvc = 'Please enter a valid CVC';
        return;
      }
    };

    scope.onCvcFocus = function(){
      if (scope.checkout.cvc === 'Please enter a valid CVC') {
        scope.checkout.cvc = '';
      }
    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/address-line-one.html'
  };
});

// ADDRESS LINE TWO INPUT
app.directive('addressTwoInput', function(){
  var link = function(scope, element, attr) {

    scope.onAddrOneBlur = function(){

    };

    scope.onAddrOneFocus = function(){

    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/address-line-two.html'
  };
});

//CITY INPUT
app.directive('cityInput', function(){
  var link = function(scope, element, attr) {
    scope.onCityBlur = function(){

    };

    scope.onCityFocus = function(){

    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/city-input.html'
  };
});

// STATE INPUT
app.directive('stateInput', function(){
  var link = function(scope, element, attr) {
    scope.onStateBlur = function(){

    };

    scope.onStateFocus = function(){

    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/state-input.html'
  };
});

//ZIP INPUT
app.directive('zipInput', function(){
  var link = function(scope, element, attr) {
    scope.onZipBlur = function(){

    };

    scope.onZipFocus = function(){

    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/zipcode-input.html'
  };
});

//NAME GROUP

app.directive('checkoutName', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/name-input.html'
  };

});


//FIRST NAME
app.directive('lastNameInput', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/first-name-input.html'
  };

});

//LAST NAME
app.directive('firstNameInput', function(){
  var link = function(scope, element, attr) {

  };
  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/last-name-input.html'
  };
});

//EMAIL GROUP
app.directive('checkoutEmail', function(checkoutValidation){
  var link = function(scope, element, attr) {
    scope.onEmailBlur = function(){
      if (!checkoutValidation.validateEmail(scope.checkout.email)) {
        scope.checkout.email = 'Please enter a valid email';
        return;
      }
    };

    scope.onEmailFocus = function(){
      if (scope.checkout.email === 'Please enter a valid email') {
        scope.checkout.email = '';
      }
    };
  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/email-input.html'
  };
});


// CUSTOMIZATION DIRECTIVES

app.directive('mouseDownUp', function(){
  var link = function(scope, element, attr) {

    element.on('touchstart', function(){
      element.css({opacity: 0.5});
    });

    element.on('touchend', function(){
      element.css({opacity: 1});
    });

  };

  return {
    restrict: 'AC',
    link: link
  };
})
