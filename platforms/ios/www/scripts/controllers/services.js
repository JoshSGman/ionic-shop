
app.service('Products', function(){

  this.products = [];

  var images = ['images/polaroid.jpg','images/canon.jpg','images/nikon.jpg','images/leica.jpeg'];
  var prices = [150, 800, 800, 2000];

  for (var i = 0; i < 15; i++) {
    var ind = Math.floor(Math.random() * 4);
    var prod         = {};
    prod.title       = 'Polaroid Camera';
    prod.image       = images[ind];
    prod.description = 'A retro camera';
    prod.quantity    = Math.floor(Math.random() * 2);
    prod.price       = prices[ind];
    this.products.push(prod);
  }

  this.removeProduct = function(product) {
    var index = this.products.indexOf(product);
    this.products.splice(index, 1);
  };

  this.addOneProduct = function(product) {
    product.quantity++;
  };

  this.removeOneProduct = function(product) {
    product.quantity--;
  };

  this.cartTotal = function() {
    var total = 0;
    this.products.forEach(function(product, index, products){
      total += product.price * product.quantity;
    });

    return formatTotal(total);
  };

  var formatTotal = function(total) {
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

});