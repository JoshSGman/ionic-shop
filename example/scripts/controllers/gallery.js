app.controller('GalleryController',[
  '$scope', 
  '$state', 
  '$ionicSideMenuDelegate', 
  'Products',
  'stripeCheckout', 
  function($scope, $state, $ionicSideMenuDelegate, Products, stripeCheckout){
  
  // PRODUCTS IN CART //
  $scope.products = Products.galleryProducts;
  var images = [['images/polaroid.jpg','images/canon.jpg','images/nikon.jpg','images/leica.jpeg'],
  ['images/leica.jpeg','images/canon.jpg','images/nikon.jpg','images/polaroid.jpg'],
  ['images/canon.jpg','images/polaroid.jpg','images/nikon.jpg','images/leica.jpeg'],
  ['images/nikon.jpg','images/canon.jpg','images/polaroid.jpg','images/leica.jpeg']];
  var prices = [150, 800, 800, 2000];

  if (!$scope.products.length) {
    for (var i = 0; i < 25; i++) {
      var ind = Math.floor(Math.random() * 4);
      
      var prod         = {};
      prod.id          = i+1;
      prod.title       = 'Polaroid Camera';
      prod.images      = images[ind];
      prod.description = 'A retro camera';
      prod.quantity    = ind+1;
      prod.price       = prices[ind];
      Products.galleryProducts.push(prod);
    }
  }
  
  $scope.goToCart = function(){
    $state.go('cart');
  };

}]);