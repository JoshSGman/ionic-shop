
app.controller('CheckoutController',['$scope', '$state', '$ionicSideMenuDelegate', 'Products', function($scope, $state, $ionicSideMenuDelegate, Products){
  // PRODUCTS IN CART //
  $scope.total = Products.cartTotal();
  $scope.products = Products.products;

  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

  $scope.back = function(){
    $state.go('cart');
  };

}]);