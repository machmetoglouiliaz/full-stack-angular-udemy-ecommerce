import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}products/search/findByProductCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]>{
    const searchUrl = `${this.baseUrl}product-category`;
    return this.httpClient.get<GetResponseCategory>(searchUrl).pipe(map(response => response._embedded.productCategory));
  }
  
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
