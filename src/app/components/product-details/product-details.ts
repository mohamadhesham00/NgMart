import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'app/Models/iproduct';
import { ProductsService } from 'app/services/products-service';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ButtonModule, InputNumberModule, RatingModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  productId!: number;
  product!: IProduct;
  mainImage!: string;
  quantity: number = 1;

  /**
   *
   */
  constructor(private _activatedRoute: ActivatedRoute, private _productsService: ProductsService) {
    this._activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.productId = +id;
        _productsService.getProductByID(this.productId).subscribe((data) => {
          this.product = data;
          this.mainImage = this.product.images[0];
        });
      }
    });
  }
  // Event handlers
  onThumbnailClick(imgSrc: string) {
    this.mainImage = imgSrc;
  }
  onAddToCart() {
    // Implement your add to cart logic here
    console.log(`Adding ${this.quantity} of ${this.product.title} to cart.`);
  }
}
