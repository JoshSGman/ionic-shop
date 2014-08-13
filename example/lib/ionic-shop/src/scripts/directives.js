(function(angular) {
  
  //IONIC CART DIRECTIVE
  var app = angular.module('ionicShop.directives', ['ionic', 'ionicShop.services']);

  app.directive('ionCart',['Products','$templateCache', function(Products, $templateCache){
    var link = function(scope, element, attr) {
      scope.$watch('products.length', function(newVal, oldVal){
        Products.updateTotal();
        scope.emptyProducts = newVal > 0 ? false : true; 
      });

      scope.emptyProducts = scope.products.length ? false : true;

      scope.addProduct = function(product) {
        Products.addOneProduct(product);
      };

      scope.removeProduct = function(product){
          product.purchaseQuantity <= 1 ? Products.removeProduct(product) : Products.removeOneProduct(product);
      };
    };

    return {
      restrict: 'AEC',
      templateUrl: 'cart-item.html',
      link: link,
      scope: {
        products: '='
      }
    };
  }]);

  app.directive('ionProductImage',['$timeout', '$ionicModal', '$ionicSlideBoxDelegate','$templateCache', function($timeout, $ionicModal, $ionicSlideBoxDelegate, $templateCache){
    var link = function(scope, element, attr) {

      scope.closeModal = function() {
        scope.modal.hide();
        scope.modal.remove();
      };

      element.on('click', function(){
        $ionicModal.fromTemplateUrl('partials/cart-image-modal.html', {
          animation: 'slide-left-right',
          scope: scope
        })
        .then(function(modal){
          scope.modal = modal;
          scope.modal.show();
          $timeout( function() {
            $ionicSlideBoxDelegate.update();
          });
        });

      });

    };

    return {
      restrict: 'A',
      link: link,
      scope: '='
    };
  }]);

  // IONIC CHECKOUT DIRECTIVE
  app.directive('ionCartFooter',['$state', '$templateCache', function($state, $templateCache){
    var link = function(scope, element, attr) {

      element.addClass('bar bar-footer bar-dark');
      element.on('click', function(e){
        if (scope.path) {
          $state.go(scope.path);
        }
      });

      element.on('touchstart', function(){
        element.css({opacity: 0.8});
      });

      element.on('touchend', function(){
        element.css({opacity: 1});
      });
    };

    return {
      restrict: 'AEC',
      templateUrl: 'cart-footer.html',
      scope: {
        path : '=path'
      },
      link: link
    };
  }]);

  // IONIC PURCHASE DIRECTIVE
  app.directive('ionCheckout',['Products','$templateCache', function(Products, $templateCache){
    var link = function(scope, element, attr) {
      scope.$watch(function(){
        return Products.total;
      }, function(){
        scope.total = Products.total;
      });

      scope.checkout = Products.checkout;
      //*** Total sum of products in usd by default ***\\
      scope.total = Products.total;
      
      //*** Add address input fields when has-address attribute is on ion-purchase element ***\\
      if (element[0].hasAttribute('has-address')) {scope.hasAddressDir = true;}

      //*** Add email input field when has-email attribute is on ion-purchase element ***\\
      if (element[0].hasAttribute('has-email')) { scope.hasEmailDir = true; }

      //*** Add name input fields when has-name attribute is on ion-purchase element ***\\
      if (element[0].hasAttribute('has-name')) { scope.hasNameDir = true;}
    };

    return {
      restrict: 'AEC',
      templateUrl: 'checkout.html',
      link: link
    };
  }]);

  app.directive('ionGallery', ['Products', '$templateCache', function(Products, $templateCache){
    var link = function(scope, element, attr) {

      scope.addToCart = function(product){
        Products.addToCart(product);
      };
    };

    return {
      restrict: 'AEC',
      templateUrl: 'gallery-item.html',
      link: link,
      scope: {
        products: '='
      }
    };

  }]);

  //IONIC PURCHASE FOOTER DIRECTIVE
  app.directive('ionCheckoutFooter',['$compile', 'Products', 'stripeCheckout', 'CheckoutValidation','$templateCache', function($compile, Products, stripeCheckout, CheckoutValidation, $templateCache){
    var link = function(scope, element, attr) {
      scope.checkout = Products.checkout;
      scope.processCheckout = stripeCheckout.processCheckout;
      scope.stripeCallback = stripeCheckout.stripeCallback;

      element.addClass('bar bar-footer bar-dark');

      element.on('click', function(){
        if (CheckoutValidation.checkAll(scope.checkout)) {
          scope.processCheckout(scope.checkout, scope.stripeCallback);
        } else {
          var ionPurchaseSpan = document.getElementsByTagName('ion-checkout')[0].children[0];
          angular.element(ionPurchaseSpan).html('You have invalid fields:').css({color: '#ED303C', opacity: 1});
        }
      });

      element.on('touchstart', function(){
        element.css({opacity: 0.8});
      });

      element.on('touchend', function(){
        element.css({opacity: 1});
      });
    };

    return {
      restrict: 'AEC',
      templateUrl: 'checkout-footer.html',
      link: link
    };
  }]);


  //ADDITIONAL CONTENT DIRECTIVES

  //CHECKOUT CARD GROUP
  app.directive('checkoutCard',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/card-form.html'
    };

  }]);

  // CARD NUM INPUT
  app.directive('cardNumInput',['$timeout', 'CheckoutValidation','$templateCache', function($timeout, CheckoutValidation, $templateCache){
    var link = function(scope, element, attr) {
      var input = element.children()[0].children[0];
      var icon = element.children()[0].children[1];
      scope.onNumBlur = function(){
        if (!scope.checkout.cc) {return;}
        angular.element(icon).removeClass('ion-card');
        angular.element(icon).addClass('ion-loading-d');
        $timeout(function(){
          if (!CheckoutValidation.validateCreditCardNumber(scope.checkout.cc)) {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-close-round').css({color: '#ED303C'});
            return;
          } else {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-checkmark-round').css({color: '#1fda9a'});
          }
        }, 300);
      };

      scope.onNumFocus = function(){
        angular.element(icon).removeClass('ion-checkmark-round ion-close-round');
        angular.element(icon).addClass('ion-card').css({color: '#333'});
      };
    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/card-num-input.html'
    };
  }]);

  // CARD EXPIRATION INPUT
  app.directive('cardExpInput',['$timeout', 'CheckoutValidation','$templateCache', function($timeout, CheckoutValidation, $templateCache){
    var link = function(scope, element, attr) {
      var input = element.children()[0].children[0];
      var icon = element.children()[0].children[1];
      scope.onExpBlur = function(){
        if (!scope.checkout.exp) {return;}
        angular.element(icon).addClass('ion-loading-d');
        $timeout(function(){
          if (!scope.checkout.exp || !CheckoutValidation.validateExpiry(scope.checkout.exp.slice(0,2), scope.checkout.exp.slice(3))) {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-close-round').css({color: '#ED303C'});
            return;
          } else {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-checkmark-round').css({color: '#1fda9a'});
          }
        }, 300);
      };

      scope.onExpFocus = function(){
        angular.element(icon).removeClass('ion-checkmark-round ion-close-round').css({color: '#333'});
      };
    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/card-exp-input.html'
    };

  }]);

  //CARD CVC INPUT
  app.directive('cardCvcInput',['$timeout', 'CheckoutValidation', '$templateCache', function($timeout, CheckoutValidation, $templateCache){
    var link = function(scope, element, attr) {
      var input = element.children()[0].children[0];
      var icon = element.children()[0].children[1];
      scope.onCvcBlur = function(){
        if (!scope.checkout.cvc) {return;}
        angular.element(icon).addClass('ion-loading-d');
        $timeout(function(){
          if (!CheckoutValidation.validateCVC(scope.checkout.cvc)) {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-close-round').css({color: '#ED303C'});
            return;
          } else {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-checkmark-round').css({color: '#1fda9a'});
          }
        }, 300);
      };

      scope.onCvcFocus = function(){
        angular.element(icon).removeClass('ion-checkmark-round ion-close-round').css({color: '#333'});
      };

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/card-cvc-input.html'
    };
  }]);

  // ADDRESS GROUP

  app.directive('checkoutAddress',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/address.html'
    };

  }]);

  //ADDRESS LINE ONE INPUT
  app.directive('addressOneInput',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/address-line-one.html'
    };
  }]);

  // ADDRESS LINE TWO INPUT
  app.directive('addressTwoInput',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {

      scope.onAddrTwoBlur = function(){

      };

      scope.onAddrTwoFocus = function(){

      };

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/address-line-two.html'
    };
  }]);

  //CITY INPUT
  app.directive('cityInput',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {
      scope.onCityBlur = function(){

      };

      scope.onCityFocus = function(){

      };

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/city-input.html'
    };
  }]);

  // STATE INPUT
  app.directive('stateInput',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {
      scope.onStateBlur = function(){

      };

      scope.onStateFocus = function(){

      };

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/state-input.html'
    };
  }]);

  //ZIP INPUT
  app.directive('zipInput',['$timeout', 'CheckoutValidation', '$templateCache', function($timeout, CheckoutValidation, $templateCache){
    var link = function(scope, element, attr) {
      var icon = element.children()[0].children[1];
      scope.onZipBlur = function(){
        if (!scope.checkout.zipcode) {return;}
        angular.element(icon).addClass('ion-loading-d');
        $timeout(function(){
          if (!CheckoutValidation.validateZipcode(scope.checkout.zipcode)) {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-close-round').css({color: '#ED303C'});
            return;
          } else {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-checkmark-round').css({color: '#1fda9a'});
          }
        }, 300);
      };

      scope.onZipFocus = function(){
        angular.element(icon).removeClass('ion-checkmark-round ion-close-round').css({color: '#333'});
      };

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/zipcode-input.html'
    };
  }]);

  //NAME GROUP

  app.directive('checkoutName',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/name-input.html'
    };

  }]);


  //FIRST NAME
  app.directive('lastNameInput',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {

    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/first-name-input.html'
    };

  }]);

  //LAST NAME
  app.directive('firstNameInput',['$templateCache', function($templateCache){
    var link = function(scope, element, attr) {

    };
    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/last-name-input.html'
    };
  }]);

  //EMAIL GROUP
  app.directive('checkoutEmail',['$timeout', 'CheckoutValidation','$templateCache', function($timeout, CheckoutValidation, $templateCache){
    var link = function(scope, element, attr) {
      var icon = element.children()[1].children[1];
      scope.onEmailBlur = function(){
        if (!scope.checkout.email) {return;}
        angular.element(icon).addClass('ion-loading-d');
        $timeout(function(){
          if (!CheckoutValidation.validateEmail(scope.checkout.email)) {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-close-round').css({color: '#ED303C'});
            return;
          } else {
            angular.element(icon).removeClass('ion-loading-d');
            angular.element(icon).addClass('ion-checkmark-round').css({color: '#1fda9a'});
          }
        }, 300);
      };

      scope.onEmailFocus = function(){
        angular.element(icon).removeClass('ion-checkmark-round ion-close-round').css({color: '#333'});
      };
    };

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'partials/email-input.html'
    };
  }]);


  // CUSTOMIZATION DIRECTIVES

  app.directive('mouseDownUp', function(){
    var link = function(scope, element, attr) {

      element.on('touchstart', function(){
        element.css({opacity: 0.5});
      });

      element.on('touchend', function(){
        element.css({opacity: 1});
      });

    };

    return {
      restrict: 'AC',
      link: link
    };
  });

  app.directive('cartAdd', ['$timeout', function($timeout){
    var link = function(scope, element, attr){

      scope.addText = 'Add To Cart';

      element.on('click', function(){
        scope.addText = 'Added';
        element.addClass('gallery-product-added');
        $timeout(function(){
          scope.addText = 'Add To Cart';
          element.removeClass('gallery-product-added');
        }, 500);
      });
    };

    return {
      restrict: 'AC',
      link: link,
      scope: true
    };
  }]);

})(angular);
