
app.controller('CheckoutController',['$scope', '$state', '$ionicSideMenuDelegate', 'Products','stripeCheckout', function($scope, $state, $ionicSideMenuDelegate, Products, stripeCheckout){
  // PRODUCTS IN CART //
  $scope.cartProducts = Products.cartProducts;

  /* MENU TOGGLES */
  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

  $scope.back = function(){
    $ionicSideMenuDelegate.isOpen() ? $ionicSideMenuDelegate.toggleRight() : $state.go('cart');
  };

}]);