import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItems: CartItem[] = [];

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;

  constructor() { 
    
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if(data != null){
      this.cartItems = data;

      this.computeCartTotals();
    }
  }

  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

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

    //this.persistCartItems();
  }

  changeQuantityBy(cartItemId: number, quantity: number) {

    const index: number = this.cartItems.findIndex(item => +item.id === cartItemId);

    if (index >= 0) {
      this.cartItems[index].quantity += quantity;

      if (this.cartItems[index].quantity <= 0) {
        this.cartItems.splice(index, 1);
      }

      this.computeCartTotals();
    }

  }

}
