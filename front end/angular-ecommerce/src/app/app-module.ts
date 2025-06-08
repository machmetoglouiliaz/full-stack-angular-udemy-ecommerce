import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './component/product-list/product-list';
import { ProductService } from './services/product';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    ProductList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(),
    ProductService,
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
