import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandsSection } from '../brands-section/brands-section';
import { Newsletter } from '../newsletter/newsletter';
import { ProductCarousel } from '../product-carousel/product-carousel';

@Component({
  selector: 'app-home',
  imports: [ProductCarousel, RouterModule, BrandsSection, Newsletter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  /**
   *
   */
  constructor() {}
}
