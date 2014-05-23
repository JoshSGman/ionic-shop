ionic-shop
==========

ionic-shop is an open-source shopping cart and checkout library meant to be used with the ionic-framework

It is a library of directives and services that help integrate products with an easy to use shopping cart and checkout process. 

The ionic-shop currently offers integration with stripe and will soon offer integration with google wallet and paypal. 

# Dependencies:
- ionic framework
- Stripe.js

# Download:
The best way to install ionic-shop is to use bower: 
  ```bower install ionic-shop```

An alternative is to clone this repo and add it to your dependencies directory

# Installation:

Include the ```ion-cart.js``` or the minified version ```ion-cart.min.js``` in your dependencies scripts:
i.e : ```<script src="ion-cart.js"></script>```

Next include the module in your angular app:
``` angular.module('myApp', ['ionic', 'ionicShop']) ```

# Use:

The ionic-shop use:

## ion-cart

The ion-cart is a shopping cart directive that should be placed within an ion-content element. In order to use the ion-cart, you must attach a products attribute to the element that is set equal to an array of product objects like so:

```<ion-cart products='productArray'></ion-cart>```

The product Array should have objects with the following fields:
```
{
  title: 'product name',
  description: 'product description',
  quantity: integer (number of products added),
  price: integer (per unit price of the product),
  image: 'pathToImageUrl.jpg' (A string containing the path to your image url),
  id: an optional field to give each product a unique id 
}
```

