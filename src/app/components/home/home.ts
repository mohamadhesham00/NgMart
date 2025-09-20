import { Component } from '@angular/core';
import { ProductCarousel } from '../product-carousel/product-carousel';

@Component({
  selector: 'app-home',
  imports: [ProductCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
