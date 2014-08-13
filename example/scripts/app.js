
var app = angular.module('ionicShopCtrl', ['ionic', 'ionicShop']);

app.run(function($ionicPlatform, stripeCheckout, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

   stripeCheckout.setStripeKey('pk_test_hXnwnglXuPWNu5NRmmJJdrwX');

   stripeCheckout.setStripeTokenCallback = function(status, response, products) {
     console.log(status, response, products);
     $http.post('/stripe/pay', {
      stripeToken : response.id,
      products: products
     })
     .success(function(data){
      console.log(data);
     });
   };

});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('cart',{
      url: '/cart',
      templateUrl: 'views/cart.html',
      controller: 'CartController'
    })
    .state('checkout',{
      url: '/checkout',
      templateUrl: 'views/checkout.html',
      controller: 'CheckoutController'
    })
    .state('gallery', {
      url: '/gallery',
      templateUrl: 'views/gallery.html',
      controller: 'GalleryController'
    });

    $urlRouterProvider.otherwise('checkout');

});
