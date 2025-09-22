import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IcartItem } from 'app/Models/icart-item';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  @Input() item!: IcartItem;
  @Output() remove = new EventEmitter<void>();
  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();
}
