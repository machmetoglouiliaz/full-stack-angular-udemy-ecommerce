import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '../../../../node_modules/@angular/router/router_module.d-mlGavL8F';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.listProducts(); });
    this.listProducts();
  }

  listProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    else this.currentCategoryId = 1;

    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    );
    
  }
}
