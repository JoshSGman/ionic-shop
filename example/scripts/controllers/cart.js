
app.controller('CartController',[
  '$scope', 
  'Products',
  'stripeCheckout',
  '$http',
  '$timeout',
  '$state', 
  function($scope, Products, stripeCheckout, $http, $timeout, $state){
  // PRODUCTS IN CART //
  $scope.cartProducts = Products.cartProducts;

  // TO BE REMOVED
  
  $scope.checkoutPath = 'checkout';

  $scope.goToGallery = function(){
    $state.go('gallery');
  };

}]);  