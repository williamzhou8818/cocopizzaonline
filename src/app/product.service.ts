import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    //return this.db.list('/products');
    return this.db.list('/products').snapshotChanges().map( data => {
      return data.map( c => ({ key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  get(productId) {
    return this.db.object('/products/' + productId);
  }
 
  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}


