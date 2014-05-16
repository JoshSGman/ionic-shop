
//IONIC CART DIRECTIVE
app.directive('ionCart', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/cart-item.html',
    link: link
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
app.directive('ionPurchase', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/purchase.html',
    link: link
  };
});

//IONIC PURCHASE FOOTER DIRECTIVE
app.directive('ionPurchaseFooter', function(){
  var link = function(scope, element, attr) {
    element.addClass('bar bar-footer bar-dark');
    element.on('click', function(){
      scope.processCheckout(scope.checkout, scope.responseHandler);
    });
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/purchase-footer.html',
    link: link
  };
});


//ADDITIONAL CONTENT DIRECTIVES
app.directive('hasEmail', function(){
  var link = function(scope, element, attr) {
    if (element[0].tagName !== 'ION-PURCHASE') {return;}
    var email = '<label class="item item-input"><input type="text" ng-model="checkout.email" placeholder="E-Mail"</label>';
    var parent = element.children()[1];
    angular.element(parent).prepend(email);
  };

  return {
    restrict: 'AC',
    link: link
  };
});

app.directive('hasAddress', function($compile){
  var link = function(scope, element, attr) {
    if (element[0].tagName !== 'ION-PURCHASE') {return;}
    var address = $compile('<checkout-address></checkout-address>');
    var parent = element.children()[1];
    angular.element(parent).append(address);
  };

  return {
    restrict: 'AC',
    link: link
  };
});

app.directive('checkoutAddress', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/partials/address.html'
  };
});

// CUSTOMIZATION DIRECTIVES

