import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {

  // orderSummary;
  // productIds;
  //  cartlength = 0;
  // subtotal = 0;
  // totalPrice = 0;
  // orderProduct=[];
  cart$;
  cart;
  totalPrice;
  productIds;
  shoppingCartItemCount: number;
  // orderSummarySubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService
      ) { }

async ngOnInit() {
this.cart$ = await this.shoppingCartService.getCart();

this.cart$.valueChanges().subscribe(cart => {
this.cart = cart;
this.productIds = Object.keys(cart.items || {});

this.shoppingCartItemCount = 0 ;
this.totalPrice = 0;

for (let productId in cart.items) {

this.shoppingCartItemCount += cart.items[productId].quantity;
this.totalPrice += cart.items[productId].product.price * cart.items[productId].quantity;
};

});    

}

  // constructor(private orderService: OrderService) { }

  // async  ngOnInit() {
  //    let orderSummary$ = await this.orderService.getOrderSummary();

  //    this.orderSummarySubscription = orderSummary$.subscribe( orderSummary => {
  //         this.orderSummary = orderSummary;

  //         //console.log(this.orderSummary);

  //         for (let productId in orderSummary) {

  //           // console.log(this.cart.items[productId].product.price);
  //           // console.log(this.cart.items[productId].quantity);
  //           let itemId = this.orderSummary[productId].items;
  //            //console.log(itemId);

  //           for(let product in itemId) {
  //               console.log(itemId[product].length);
  //               // console.log(itemId[product].quantity);
  //                           console.log(itemId[product].quantity);

  //               console.log(itemId[product].product.price);
  //               this.subtotal += (itemId[product].quantity) *  (itemId[product].product.price);
  //               this.cartlength  += itemId[product].quantity;

  //               console.log(this.cartlength);
                
  //               this.orderProduct.push({ 
  //                     quantity: itemId[product].quantity,
  //                     title: itemId[product].product.title,
  //                     price: itemId[product].product.price,
                    
  //                   });

  //           } 
    
    
    
  //         };
          
  //    });
  // }
  // ngOnDestroy() {
  //   this.orderSummarySubscription.unsubscribe();
  // }

}
