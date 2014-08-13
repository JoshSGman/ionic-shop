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

Include the ```ion-shop-styles.css```  in your dependencies:

i.e : ```<link href="bower_components/ionic-shop/dist/styles/ion-shop-style.css" rel="stylesheet">```

Additionally, include the Stripe script, it will be used for some field validations:
 ```<script type="text/javascript" src="https://js.stripe.com/v2/"></script>```

Next include the module in your angular app:
``` angular.module('myApp', ['ionic', 'ionicShop']) ```

# Use:

The ionic-shop use:

## ion-cart

The ion-cart is a shopping cart directive that should be placed within an ion-content element. In order to use the ion-cart, you must attach a products attribute/isolate scope to the element that is set equal to an array of product objects like so:

```
<ion-content>
 <ion-cart products='productArray'></ion-cart>
</ion-content>
```

The product Array should have objects with the following fields:
```
{
  title: 'product name',
  description: 'product description',
  quantity: integer (number of products added),
  price: integer (per unit price of the product),
  images: (An array of strings containing the path to your image url),
  id: an optional field to give each product a unique id 
}
```

Additionally, the ion-cart comes with an image-slider modal that pops up when a user clicks/touches the image.

## ion-cart-footer

The ion-cart-footer directive should be placed after the ion-content in your application. It replaces the normal ion-footer element. The ion-cart-footer takes a path attribute/isolate scope that is set equal to a state specified in your ui-router like so.

```
<ion-header></ion-header>
<ion-content>
  <ion-cart products='productArray'></ion-cart>
</ion-content>
<ion-cart-footer path='checkout'></ion-cart-footer> 
```

In the example above, on-click, the application will call $state.go('checkout').

## ion-checkout

The ion-checkout directive is a checkout form content with field validations. The default fields are: Credit Card Number, Expiration Date, and CVC number. Validation is performed on all fields automatically on blur. Additionally, as a convenience, the ion-checkout directive displays the total cost of all the items in the ion-cart. The directive can be used like so:

```
<ion-content>
  <ion-checkout></ion-checkout>
</ion-content>
```

The ion-checkout directive comes with a few options:

#### has-email

The has-e-mail attribute/directive attaches an e-mail field to the ion-checkout. Email field comes with validation. 

```
<ion-checkout has-email></ion-checkout>
```

#### has-address

The has-address attribute/directive attaches an address field to the ion-checkout. Address fields come with zipcode validation

```
<ion-checkout has-address></ion-checkout>
```

#### has-name

The has-name attribute/directive attaches a first and last name field to the ion-checkout.

```
<ion-checkout has-name></ion-checkout>
```

## checkout-footer 

*** Currently you must have a Stripe Account to use this feature.

The checkout-footer directive validates checkout field inputs and calls on the StripeService to create a stripe token for the checkout form using the Stripe public key that you set using the StripeService.setStripeKey method and a callback created by settings a function equal to the StripeService.setStripeTokenCallback method like so:

```
StripeService.setStripeKey(stripeKey);
StripeService.setStripeCallback = function(status, response){
  // Proccess the response
});
```

## Styling

For the time being, all directives in the ionic shop library can be styled using basic css on the following classes and their elements. 

### Styles for the ionic-cart items

#### Cart Item

.product-card affects the outer cart item div tag

.product-item affects the inner cart item div tag

.product-image affects the product image thumbnail img tag

.product-title affects the product title h3 tag

.product-description affects the product description p tag

.product-quantity affects the product quantity span

.product-price affects the product price span

.icon-plus-round affects the + sign icon

.icon-minus-round affects the - sign icon

#### Cart Image Modal

.image-slider-modal affects the image slider modal div

.image-slider-box affects the image slider box div

.image-slide-div affects the div encompassing the product description and img

.image-slide-description affects the image description h3 tag

.image-slide affects the actual image

#### Checkout Form

.checkout-form-description affects the description span at the top of the form

.checkout-form affects the actual checkout form div

.checkout-total affects the total span at the bottom of the checkout form

#### Inputs

All the following classes affect their respective input fields

.address-line-one
.address-line-two
.card-cvc-input
.card-exp-input
.card-num-input
.city-input
.email-input
.first-name-input
.last-name-input
.state-input
.zipcode-input


## To Do (Not ordered)

  - IonicShop Web Admin Panel to manage product inventory/sales history(In the works);
  - Create additional styling attributes for all directives
  - Integrate with Paypal/Google Wallet
  - Write Tests
  - More Suggestions!
