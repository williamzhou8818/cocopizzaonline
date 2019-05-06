import { Product } from './product';


export class ShoppingCartItem{
    proudct: Product;
    quantity: number;

    get totalPrice() {
        return this.proudct.price * this.quantity;
    }
}