import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) { 
      this.cartService.addToCart(product)
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    
    if (!this.shoppingCart) {
      return;
    }else if (this.shoppingCart.items) {
      let item = this.shoppingCart.items[this.product.key];
      return item? item.quantity : 0;
    }

  }

}
