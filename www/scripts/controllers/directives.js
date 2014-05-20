
//IONIC CART DIRECTIVE
app.directive('ionCart', function(Products){
  var link = function(scope, element, attr) {
    scope.$watch(function(){
      return Products.products;
    }, function(){
      Products.updateTotal();
    });

    scope.addProduct = function(product) {
      Products.addOneProduct(product);
    };

    scope.removeProduct = function(product){
        product.quantity <= 1 ? Products.removeProduct(product) : Products.removeOneProduct(product);
    };
  };

  return {
    restrict: 'AEC',
    templateUrl: 'views/cart-item.html',
    link: link,
    scope: {
      products: '=products'
    }
  };
});

app.directive('ionProductImage', function($timeout, $ionicModal, $ionicSlideBoxDelegate){
  var link = function(scope, element, attr) {

    scope.closeModal = function() {
      scope.modal.hide();
      scope.modal.remove();
    };

    element.on('click', function(){
      $ionicModal.fromTemplateUrl('views/partials/cart-image-modal.html', {
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
});

// IONIC CHECKOUT DIRECTIVE
app.directive('ionCheckout', function($state){
  var link = function(scope, element, attr) {

    element.addClass('bar bar-footer bar-dark');
    element.on('click', function(e){
      $state.go(scope.path);
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
    templateUrl: 'views/checkout-footer.html',
    scope: {
      path : '=path'
    },
    link: link
  };
});

// IONIC PURCHASE DIRECTIVE
app.directive('ionPurchase', function(Products){
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
    templateUrl: 'views/purchase.html',
    link: link
  };
});

//IONIC PURCHASE FOOTER DIRECTIVE
app.directive('ionPurchaseFooter', function($compile, Products, stripeCheckout, CheckoutValidation){
  var link = function(scope, element, attr) {
    scope.checkout = Products.checkout;
    scope.processCheckout = stripeCheckout.processCheckout;

    element.addClass('bar bar-footer bar-dark');

    element.on('click', function(){
      if (CheckoutValidation.checkAll(scope.checkout)) {
        scope.processCheckout(scope.checkout);
      } else {
        var ionPurchaseSpan = document.getElementsByTagName('ion-purchase')[0].children[0];
        angular.element(ionPurchaseSpan).html('Please correct the following:').css({color: '#ED303C', opacity: 1});
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
    templateUrl: 'views/purchase-footer.html',
    link: link
  };
});


//ADDITIONAL CONTENT DIRECTIVES

//CHECKOUT CARD GROUP
app.directive('checkoutCard', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/card-form.html'
  };

});

// CARD NUM INPUT
app.directive('cardNumInput', function($timeout, CheckoutValidation){
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
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/card-num-input.html'
  };
});

// CARD EXPIRATION INPUT
app.directive('cardExpInput', function($timeout, CheckoutValidation){
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
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/card-exp-input.html'
  };

});

//CARD CVC INPUT
app.directive('cardCvcInput', function($timeout, CheckoutValidation){
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
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/card-cvc-input.html'
  };
});

// ADDRESS GROUP

app.directive('checkoutAddress', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/address.html'
  };

});

//ADDRESS LINE ONE INPUT
app.directive('addressOneInput', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/address-line-one.html'
  };
});

// ADDRESS LINE TWO INPUT
app.directive('addressTwoInput', function(){
  var link = function(scope, element, attr) {

    scope.onAddrTwoBlur = function(){

    };

    scope.onAddrTwoFocus = function(){

    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/address-line-two.html'
  };
});

//CITY INPUT
app.directive('cityInput', function(){
  var link = function(scope, element, attr) {
    scope.onCityBlur = function(){

    };

    scope.onCityFocus = function(){

    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/city-input.html'
  };
});

// STATE INPUT
app.directive('stateInput', function(){
  var link = function(scope, element, attr) {
    scope.onStateBlur = function(){

    };

    scope.onStateFocus = function(){

    };

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/state-input.html'
  };
});

//ZIP INPUT
app.directive('zipInput', function($timeout, CheckoutValidation){
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
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/zipcode-input.html'
  };
});

//NAME GROUP

app.directive('checkoutName', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/name-input.html'
  };

});


//FIRST NAME
app.directive('lastNameInput', function(){
  var link = function(scope, element, attr) {

  };

  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/first-name-input.html'
  };

});

//LAST NAME
app.directive('firstNameInput', function(){
  var link = function(scope, element, attr) {

  };
  return {
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/last-name-input.html'
  };
});

//EMAIL GROUP
app.directive('checkoutEmail', function($timeout, CheckoutValidation){
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
    restrict: 'AEC',
    link: link,
    templateUrl: 'views/partials/email-input.html'
  };
});


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
