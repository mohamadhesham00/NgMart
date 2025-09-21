import { Routes } from '@angular/router';
import { Auth } from './components/auth/auth';
import { Cart } from './components/cart/cart';
import { Home } from './components/home/home';
import { ProductDetails } from './components/product-details/product-details';
import { Products } from './components/products/products';
import { Profile } from './components/profile/profile';
import { Wishlist } from './components/wishlist/wishlist';
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetails },
  { path: 'auth', component: Auth, canActivate: [noAuthGuard] },
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'profile', component: Profile },
  { path: 'wishlist', component: Wishlist, canActivate: [authGuard] },
];
