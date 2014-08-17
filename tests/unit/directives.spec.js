describe('ion cart', function(){
  beforeEach(module('ionicShop'));
 
  // PRODUCTS IN CART //
  var products = [];
  var images = [['images/polaroid.jpg','images/canon.jpg','images/nikon.jpg','images/leica.jpeg'],
  ['images/leica.jpeg','images/canon.jpg','images/nikon.jpg','images/polaroid.jpg'],
  ['images/canon.jpg','images/polaroid.jpg','images/nikon.jpg','images/leica.jpeg'],
  ['images/nikon.jpg','images/canon.jpg','images/polaroid.jpg','images/leica.jpeg']];
  var prices = [150, 800, 800, 2000];

  if (!products.length) {
    for (var i = 0; i < 25; i++) {
      var ind = Math.floor(Math.random() * 4);
      
      var prod         = {};
      prod.id          = i+1;
      prod.title       = 'Polaroid Camera';
      prod.images      = images[ind];
      prod.description = 'A retro camera';
      prod.quantity    = ind+1;
      prod.price       = prices[ind];
      products.push(prod);
    }
  }
 
  describe('ion cart', function(){
    var templateCache, scope, compile, element, isolateScope;
 
    beforeEach(inject([
      '$rootScope', 
      '$compile', 
      '$templateCache', 
      '$injector',
      function($rootScope, $compile, $templateCache, $injector){
        scope = $rootScope.$new();
        scope.productsArr = products;
        templateCache = $templateCache;
        directive = $injector.get('ionCartDirective');
        Products = $injector.get('Products');
        element = $compile(angular.element('<ion-cart products="productsArr"></ion-cart>'))(scope);
        scope = element.scope().$apply();
        isolateScope = element.isolateScope();
    }]));
 
    it('has the ion cart directive', function(){
      expect(directive).not.toBe(undefined);
    });
 
    it('logs a template for cart-item.html', function(){
      expect(templateCache.get('cart-item.html')).not.toBe(undefined);
    });
 
    it('has an isolate scope', function() {
      expect(isolateScope).not.toBe(undefined);
    });
 
    it('has an isolate scope with a "Products" property on it', function() {
      expect(isolateScope.products).not.toBe(undefined);
    });
 
    it('has an addProduct method', function(){
      expect(typeof isolateScope.addProduct).toBe("function");
    });
 
    it('has a removeProduct method', function(){
      expect(typeof isolateScope.removeProduct).toBe("function");
    });

    it('has an emptyProducts boolean on the isolateScope', function(){
      expect(typeof isolateScope.emptyProducts).toBe("boolean");
    });
 
  });
 
});