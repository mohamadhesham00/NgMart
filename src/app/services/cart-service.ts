import { Injectable } from '@angular/core';
import { IcartItem } from 'app/Models/icart-item';
import { IProduct } from 'app/Models/iproduct';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';
  private _isCartEmpty$ = new BehaviorSubject<boolean>(true);
  isCartEmpty$ = this._isCartEmpty$.asObservable();

  getCart(): IcartItem[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveCart(cart: IcartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  addItem(product: IProduct, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    this.saveCart(cart);
    this.updateCartState();
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: product.title + ' added to cart',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  removeItem(productId: number) {
    const cart = this.getCart().filter((item: any) => item.product.id !== productId);
    this.saveCart(cart);
    this.updateCartState();
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
    this.updateCartState();
  }
  private updateCartState(): void {
    this._isCartEmpty$.next(this.getCart().length === 0);
  }
}
