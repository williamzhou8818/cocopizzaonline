import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  cart$;
  cart;
  totalPrice;
  productIds;
  shoppingCartItemCount: number;

  constructor(private shoppingCartService: ShoppingCartService,
              private  router: Router
    ) { }

  async ngOnInit() {
   this.cart$ = await this.shoppingCartService.getCart();

    this.cart$.valueChanges().subscribe(cart => {
      this.cart = cart;
      this.productIds = Object.keys(cart.items || {});
      //console.log(this.productIds);

      this.shoppingCartItemCount = 0 ;
      this.totalPrice = 0;
      
      for (let productId in cart.items) {
          
          this.shoppingCartItemCount += cart.items[productId].quantity;
          this.totalPrice += cart.items[productId].product.price * cart.items[productId].quantity;
      };
      
    });    

  }


  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
    //this.router.navigate(['/']);
  }
 
  // getQuantity() {
  //   if (!this.shoppingCart) return 0;

  //   let item = this.shoppingCart.items[this.product.key];
  //   return item ? item.quantity : 0;
  // }


}
