import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, 
              private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: any) {
   let  result =  await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart()
    return result 
  } 
  getOrders() {
    return this.db.list('/orders');
  }
  // getOrdersById(OrderId: any) {
  //   return this.db.object('/orders/'+ OrderId);
  // }

  getOrderSummary() {
    return this.db.list('/orders').snapshotChanges().map( data => {
      return data.map( c => ({ key: c.payload.key, ...c.payload.val()
      }));
    });
  }
}
