import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { Observable } from '../../../../node_modules/rxjs/dist/types/index';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  public product!: Product;

  constructor(private route: ActivatedRoute,
              private service: ProductService,
              private cartService: CartService
              ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.getProduct() });
  }

  addToCart() {

    const cartItem: CartItem = new CartItem(this.product);

    this.cartService.addToCart(cartItem);

  }

  getProduct() {

    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.service.getProductById(productId).subscribe(data => {
      this.product = data
    });
  }

}
