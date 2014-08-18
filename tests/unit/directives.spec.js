function camelCaseToHyphen(str){
  var string = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      string += '-';
      str[i] = str[i].toLowerCase();
    }
    string += str[i];
  }
  return string;
}

describe('Directives', function(){
  var templateCache, scope, compile, element, isolateScope, d, Products, Directive;

  // PRODUCTS IN CART //
  var products = [];
  var images = [];
  var prices = [150, 800, 800, 2000];
  
  beforeEach(module('ionicShop'));
  beforeEach(inject([
    '$rootScope', 
    '$compile', 
    '$templateCache', 
    '$injector',
    function($rootScope, $compile, $templateCache, $injector){

      Directive = function(directiveName){    
        var directiveString = camelCaseToHyphen(directiveName);
        this.directive = $injector.get(directiveName + 'Directive');
        this.element = $compile(angular.element('<'+ directiveString +' products="productsArr"></'+ directiveString + '>'))(scope);
        this.classElement = $compile(angular.element('<div class="'+ directiveString +'" products="productsArr"></div>'))(scope);
        this.attrElement  = $compile(angular.element('<div '+ directiveString +' products="productsArr"></div>'))(scope);
        this.element.scope().$apply();
        this.isolateScope = this.element.isolateScope();
      };

      scope = $rootScope.$new();
      scope.productsArr = products;
      templateCache = $templateCache;
      Products = $injector.get('Products');
  }]));

  describe('ion cart', function(){
    var d;
    beforeEach(function(){
      d = new Directive('ionCart');
    })

    it('has the ion cart directive', function(){
      expect(d.directive).toBeDefined();
    });

    it('can be defined as an element, attribute or class', function(){
      expect(d.element[0].childNodes.length).toBe(5);
      expect(d.classElement[0].childNodes.length).toBe(5);
      expect(d.attrElement[0].childNodes.length).toBe(5);
    })
 
    it('logs a template for cart-item.html', function(){
      expect(templateCache.get('cart-item.html')).toBeDefined();
    });
 
    it('has an isolate scope', function() {
      expect(d.isolateScope).toBeDefined();
    });
 
    it('has an isolate scope with a "Products" property on it', function() {
      expect(d.isolateScope.products).toBeDefined();
    });
 
    it('has an addProduct method', function(){
      expect(typeof d.isolateScope.addProduct).toBe("function");
    });
 
    it('has a removeProduct method', function(){
      expect(typeof d.isolateScope.removeProduct).toBe("function");
    });

    it('has an emptyProducts boolean', function(){
      expect(typeof d.isolateScope.emptyProducts).toBe("boolean");
    });

    it('watches the products array and sets the emptyProducts boolean', function(){
      expect(d.isolateScope.emptyProducts).toBe(true);

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

      scope.$digest();
      expect(d.isolateScope.emptyProducts).toBe(false);

      for (var i = 0; i < 25; i++) {
        products.pop();
      }
      scope.$digest();
      expect(d.isolateScope.emptyProducts).toBe(true);
    });
  });

});