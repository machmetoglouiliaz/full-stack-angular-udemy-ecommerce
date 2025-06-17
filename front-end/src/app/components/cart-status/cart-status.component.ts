import { Component } from '@angular/core';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  standalone: false,
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0.00;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.updateCartStatus();
  }


  updateCartStatus() {

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      });

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data
      });
  }

}
