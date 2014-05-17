
app.controller('CartController',['$scope', 'Products', function($scope, Products){
  // PRODUCTS IN CART //
  $scope.products = Products.products;

}]);