
app.controller('CheckoutController',['$scope', '$state', '$ionicSideMenuDelegate', 'Products','stripeCheckout', function($scope, $state, $ionicSideMenuDelegate, Products, stripeCheckout){
  // PRODUCTS IN CART //
  $scope.total = Products.cartTotal();
  $scope.products = Products.products;

  /* MENU TOGGLES */
  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

  $scope.checkout = stripeCheckout.checkout;
  $scope.processCheckout = stripeCheckout.processCheckout;
  $scope.responseHandler = stripeCheckout.stripeResponseHandler;

  /* PRODUCT CRUD */
  $scope.addProduct = function(product) {
    Products.addOneProduct(product);
    $scope.total = Products.cartTotal();
  };

  $scope.removeProduct = function(product){
      product.quantity <= 1 ? Products.removeProduct(product) : Products.removeOneProduct(product);
      $scope.total = Products.cartTotal();
      if(!$scope.$$phase) {
        $scope.apply();
      }
  };

  $scope.back = function(){
    $ionicSideMenuDelegate.isOpen() ? $ionicSideMenuDelegate.toggleRight() : $state.go('cart');
  };

}]);