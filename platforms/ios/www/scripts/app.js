// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionicShop', ['ionic']);



app.run(function($ionicPlatform) {
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
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl : 'views/home.html',
      controller: 'MainController' 
    })
    .state('cart',{
      url: '/cart',
      templateUrl: 'views/cart.html',
      controller: 'CartController'
    })
    .state('checkout',{
      url: '/checkout',
      templateUrl: 'views/checkout.html',
      controller: 'CheckoutController'
    });

    $urlRouterProvider.otherwise('home');

});
