import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { Observable } from '../../../../node_modules/rxjs/dist/types/index';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  public product!: Product;

  constructor(private route: ActivatedRoute,
    private service: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.getProduct() });
  }

  getProduct() {

    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.service.getProductById(productId).subscribe(data => {
      this.product = data
    });
  }

}
