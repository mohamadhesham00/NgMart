import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IProduct } from 'app/Models/iproduct';
import { ProductUiHelper } from 'app/services/product-ui-helper';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-product-card',
  imports: [ButtonModule, Tag, RatingModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  currentImage!: string;

  @Input() product!: IProduct; // Use a proper interface or class for 'any'
  constructor(public _productUiHelper: ProductUiHelper) {}
  ngOnInit(): void {
    // Set the initial image to the product's thumbnail
    this.currentImage = this.product.thumbnail;
  }

  onMouseEnter() {
    // Check if a second image exists before attempting to switch
    if (this.product.images && this.product.images.length > 1) {
      this.currentImage = this.product.images[1];
    }
  }

  onMouseLeave() {
    // Revert to the original thumbnail image
    this.currentImage = this.product.thumbnail;
  }
}
