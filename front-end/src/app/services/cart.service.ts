import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(cartItem: CartItem) {

    
    let existingItem: CartItem | undefined = this.cartItems.find(tItem => tItem.id === cartItem.id);
    let existsInCart: boolean = (existingItem != undefined);

    /* //-- REFUCTORED ABOVE --// 
    if (this.cartItems.length > 0) {

      for (let tItem of this.cartItems) {
        if (tItem.id == cartItem.id) {
          existingItem = tItem;
          break;
        }
      }

      existsInCart = (existingItem != undefined);
    }
    */

    existsInCart ? existingItem!.quantity++ : this.cartItems.push(cartItem);

    /* //-- REFUCTORED ABOVE --//
    if (existsInCart) {
      existingItem!.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    */

    this.computeCartTotals();
  }


  computeCartTotals() {

    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for (let item of this.cartItems) {
      totalPrice += item.unitPrice * item.quantity;
      totalQuantity += item.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
  }
}
