import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  lastSearched: string = "";


  pageNumber: number = 1;
  pageSize: number = 10;
  pageTotalElements: number = 0;
  
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.listProducts(); });
  }

  updatePageSize(size: string) {
    this.pageSize = +size;
    this.pageNumber = 1;
    this.listProducts();
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
    
  }
  handleSearchProducts() {
    
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.lastSearched != keyword) {
      this.pageNumber = 1;
    }

    this.lastSearched = keyword;

    this.productService.searchProductsPaginated(this.pageNumber - 1, this.pageSize, keyword).subscribe(
      this.processResult()
    );
    }

  handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    else this.currentCategoryId = 1;


    if (this.currentCategoryId != this.previousCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginated(this.pageNumber - 1, this.pageSize, this.currentCategoryId, hasCategoryId).subscribe(
      this.processResult()
    );

  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.pageTotalElements = data.page.totalElements;
    }
  }
}
