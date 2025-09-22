import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { IcartItem } from 'app/Models/icart-item';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../cart-item/cart-item';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CartItem, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  isCartEmpty = true;
  cart: IcartItem[] = [];
  subtotal = 0;
  shipping = 0;
  tax = 0;
  total = 0;

  constructor(private _cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
    this._cartService.isCartEmpty$.subscribe((empty) => {
      this.isCartEmpty = empty;
    });
  }

  loadCart(): void {
    this.cart = this._cartService.getCart();
    this.updateSummary();
  }

  updateSummary(): void {
    this.subtotal = this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    this.shipping = this.subtotal > 0 ? 10 : 0;
    this.tax = this.subtotal * 0.08;
    this.total = this.subtotal + this.shipping + this.tax;
  }

  increaseQuantity(id: number): void {
    const item = this.cart.find((i) => i.product.id === id);
    if (item) item.quantity++;
    this._cartService.saveCart(this.cart);
    this.updateSummary();
  }

  decreaseQuantity(id: number): void {
    const item = this.cart.find((i) => i.product.id === id);
    if (item && item.quantity > 1) item.quantity--;
    this._cartService.saveCart(this.cart);
    this.updateSummary();
  }

  removeItem(id: number): void {
    this._cartService.removeItem(id);
    this.loadCart();
  }

  checkout(): void {
    this._cartService.clearCart();
    this.router.navigateByUrl('/checkout');
  }
}
