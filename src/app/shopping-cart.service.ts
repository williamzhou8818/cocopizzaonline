import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './model/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


import { ShoppingCart } from './model/shopping-cart';
import { map } from 'rxjs-compat/operator/map';
import { Observable } from 'rxjs/Observable';
// import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
   private create() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    });
  }

async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
     
}

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key; 
    
    }
  
   async addToCart(product: Product) {
     let cartId = await this.getOrCreateCartId();
     let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
     
     item$.valueChanges().take(1).subscribe( (item: any ) => {
       
        if (item === null )  return  item$.set({product: product, quantity: 1});
        else  return item$.update({quantity: (item.quantity || 0)  + 1});
       
     });
      
    }

    async removeFromCart(product: Product) {
      let cartId = await this.getOrCreateCartId();
      let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
      
      item$.valueChanges().take(1).subscribe( (item: any ) => {
        
         if (item === null ) return  item$.set({product: product, quantity: 1});
         if (item.quantity === 1) {
          item$.remove();
        }  else { item$.update({quantity: (item.quantity || 0)  - 1});
           } 
      });
  
    }

  async clearCart() {
        let cartId = await this.getOrCreateCartId();
        this.db.object('/shopping-carts/' + cartId + '/items/').remove();

    }

  


}
