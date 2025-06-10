import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.html',
  //templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products: Product[] = [];
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    );
    
  }
}
