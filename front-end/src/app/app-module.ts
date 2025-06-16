import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product-service';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { Search } from './components/search/search';
import { ProductDetails } from './components/product-details/product-details';


@NgModule({
  declarations: [
    App,
    ProductList,
    ProductCategoryMenu,
    Search,
    ProductDetails
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    ProductService
  ],
  bootstrap: [App]
})
export class AppModule { }
