
app.controller('CheckoutController',['$scope', 'Products', function($scope, Products){
  // PRODUCTS IN CART //
  $scope.total = Products.cartTotal();
  console.log($scope.total);

}]);