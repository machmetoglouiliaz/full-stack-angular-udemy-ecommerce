import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  private baseUrl = environment.demoAngularEcommerceUrl + "/";

  constructor(private httpClient: HttpClient) { }


  getProductList(categoryId: number): Observable<GetResponse> {

    const searchUrl = `${this.baseUrl}products/search/findByProductCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }


  getProductListPaginated(page: number, pageSize: number, categoryId: number, hasCategoryId: boolean): Observable<GetResponse> {

    let searchUrl = '';

    if (hasCategoryId) searchUrl = `${this.baseUrl}products/search/findByProductCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    else searchUrl = `${this.baseUrl}products?page=${page}&size=${pageSize}`;
    return this.getProducts(searchUrl);
  }


  searchProducts(keyword: string) {

    const searchUrl = `${this.baseUrl}products/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }


  searchProductsPaginated(page: number, pageSize: number, keyword: string): Observable<GetResponse> {

    const searchUrl = `${this.baseUrl}products/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;
    return this.getProducts(searchUrl);
  }


  getProducts(url: string): Observable<GetResponse>{

  return this.httpClient.get<GetResponse>(url).pipe(map(response => response));
  }


  getProductCategories(): Observable<ProductCategory[]>{

    const searchUrl = `${this.baseUrl}product-category`;
    return this.httpClient.get<GetResponseCategory>(searchUrl).pipe(map(response => response._embedded.productCategory));
  }


  getProductById(productId: number): Observable<Product>{

    const url = `${this.baseUrl}products/${ productId }`;
    return this.httpClient.get<Product>(url);
  }
  
}

interface GetResponse {
  _embedded: {
    products: Product[]
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
