
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
    scope.total = Products.cartTotal();
    //*** Add address input fields when has-address attribute is on ion-purchase element ***\\
    if (element[0].hasAttribute('has-address')) {scope.hasAddressDir = true;}

    //*** Add email input field when has-email attribute is on ion-purchase element ***\\
    if (element[0].hasAttribute('has-email')) { scope.hasEmailDir = true; }

    //*** Add name input fields when has-name attribute is on ion-purchase element ***\\
    if (element[0].hasAttribute('has-name')) { scope.hasNameDir = true;}

    /* Add extra space to the bottom of the pane when additional inputs 
       are added to account for the bottom of the pane on scroll
     */
    if (element[0].hasAttribute('has-email') || element[0].hasAttribute('has-address') || element[0].hasAttribute('has-name')) {
      angular.element(element).append('<br><br><br><br>');
    }

    scope.clearFieldCC = function(){
      if (scope.checkout.cc === 'Please enter a valid credit card #') {
        scope.checkout.cc = '';
      }
    };

    scope.clearFieldExp = function(){
      if (scope.checkout.exp === 'Please enter a valid expiration date') {
        scope.checkout.exp = '';
      }
    };

    scope.clearFieldCVC = function(){
      if (scope.checkout.cvc === 'Please enter a valid CVC') {
        scope.checkout.cvc = '';
      }
    };

    scope.clearFieldEmail = function(){
      if (scope.checkout.email === 'Please enter a valid Email') {
        scope.checkout.email = '';
      }
    };
 
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/purchase.html',
    link: link
  };
});

//IONIC PURCHASE FOOTER DIRECTIVE
app.directive('ionPurchaseFooter', function(Products, stripeCheckout, checkoutValidation){
  var link = function(scope, element, attr) {
    scope.checkout = Products.checkout;
    scope.processCheckout = stripeCheckout.processCheckout;

    element.addClass('bar bar-footer bar-dark');

    element.on('click', function(){

      if (!checkoutValidation.validateCreditCardNumber(scope.checkout.cc)) {
        scope.checkout.cc = 'Please enter a valid credit card #';
        scope.$apply();
        return;
      }
      
      if (!checkoutValidation.validateExpiry(checkout.exp.slice(0,2), checkout.exp.slice(3))) {
        scope.checkout.exp = 'Please enter a valid expiration date';
        scope.$apply();
        return;
      }

      if(!checkoutValidation.validateCVC(checkout.cvc)) {
        scope.checkout.cvc = 'Please enter a valid CVC';
        scope.$apply();
        return;
      }

      scope.processCheckout(scope.checkout);
    });
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/purchase-footer.html',
    link: link
  };
});


//ADDITIONAL CONTENT DIRECTIVES
app.directive('checkoutEmail', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    template: '<label class="item item-input"><input type="text" ng-model="checkout.email" placeholder="E-Mail"></label>'
  };
});

app.directive('checkoutAddress', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/address.html'
  };

});

app.directive('checkoutName', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/name-input.html'
  };

});


// CUSTOMIZATION DIRECTIVES

