
app.controller('CartController',['$scope', 'Products', function($scope, Products){
  // PRODUCTS IN CART //
  $scope.products = Products.products;

  $scope.addProduct = function(product) {
    Products.addOneProduct(product);
  };

  $scope.removeProduct = function(product, index){
    product.quantity < 1 ? Products.removeProduct(product, index) : Products.removeOneProduct(product);
  };


}]);