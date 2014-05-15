
//ionic-cart directive
app.directive('ionCart', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/cart-item.html',
    link: link
  };
});

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

app.directive('ionPurchase', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/purchase.html',
    link: link
  };
});

app.directive('ionPurchaseFooter', function(){
  var link = function(scope, element, attr) {
    element.addClass('bar bar-footer bar-dark');
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/purchase-footer.html',
    link: link
  };
});
