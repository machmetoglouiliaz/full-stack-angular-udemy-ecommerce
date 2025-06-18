import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetails } from './components/product-details/product-details';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';


const routes: Routes = [
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetails },
  { path: 'search/:keyword', component: ProductList },
  { path: 'category/:id', component: ProductList },
  { path: 'category', component: ProductList },
  { path: 'products', component: ProductList },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
