import { Routes } from '@angular/router';
import { Cart } from './components/cart/cart';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { ProductDetails } from './components/product-details/product-details';
import { Products } from './components/products/products';
import { Profile } from './components/profile/profile';
import { Wishlist } from './components/wishlist/wishlist';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetails },
  { path: 'login', component: Login },
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'profile', component: Profile },
  { path: 'wishlist', component: Wishlist, canActivate: [authGuard] },
];
