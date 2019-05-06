import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {}; 
  cart$
  cart;
  itemsPerSave;
  shoppingCartItemCount;
  totalPrice;
  productIds;
  userId: string;
  time = {hour: 13, minute: 30};
  meridian = true;
  items =[];

  cartSubscription: Subscription;
  userSubscription: Subscription;

  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  constructor(
              private router: Router,
              private authService: AuthService,
              private shoppingCartService: ShoppingCartService,
             private orderService: OrderService
    ) { 

    }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();

    this.cartSubscription = this.cart$.valueChanges().subscribe(cart => {
  this.cart = cart;
  this.productIds = Object.keys(cart.items || {});
  
  this.shoppingCartItemCount = 0 ;
  this.totalPrice = 0;
  
  for (let productId in cart.items) {
  
  this.shoppingCartItemCount += cart.items[productId].quantity;
  this.totalPrice += cart.items[productId].product.price * cart.items[productId].quantity;
  // console.log(cart.items[productId].product.title);
  // console.log(cart.items[productId].product.price);
  // console.log(cart.items[productId].quantity);

    this.items.push({
         title: cart.items[productId].product.title,
         price: cart.items[productId].product.price,
         quantity: cart.items[productId].quantity,
    })
  };
  
  }); 
     
   this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);


  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
     
     let order = {
       userId: this.userId,
       datePlaced: new Date().getTime(),
       shipping: this.shipping,
       pickuptime: this.time,
       items: this.items,
       totalPrice: this.totalPrice
     }

     let result =  await this.orderService.placeOrder(order);
     this.router.navigate(['/order-success', result.key]);
     
  }

}
