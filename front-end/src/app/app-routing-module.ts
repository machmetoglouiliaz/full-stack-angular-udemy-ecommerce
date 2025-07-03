import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetails } from './components/product-details/product-details';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import OktaAuth from '@okta/okta-auth-js';
import { OrderHistoryComponent } from './components/order-history/order-history.component';


function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
  const router = injector.get(Router);

  router.navigate(['/login']);
}

const routes: Routes = [
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  { path: 'login/callback', component: OktaCallbackComponent},
  { path: 'login', component: LoginComponent},
  { path: 'checkout', component: CheckoutComponent },
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
