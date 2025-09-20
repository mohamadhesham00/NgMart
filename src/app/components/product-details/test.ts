// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { IProduct } from 'app/models/iproduct'; // Assuming you have an IProduct interface
// import { ProductService } from 'app/services/product.service'; // Assuming you have a ProductService

// // PrimeNG and other module imports
// import { ButtonModule } from 'primeng/button';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { RatingModule } from 'primeng/rating';

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   templateUrl: './product-details.component.html',
//   styleUrls: ['./product-details.component.css'],
//   imports: [CommonModule, ButtonModule, RatingModule, InputNumberModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ProductDetailsComponent implements OnInit {
//   product!: IProduct;
//   productAvgRating!: number;
//   quantity: number = 1;
//   mainImage!: string;

//   constructor(private route: ActivatedRoute, private productService: ProductService) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.productService.getProductById(+id).subscribe({
//         next: (data) => {
//           this.product = data;
//           this.mainImage = this.product.images[0];
//         },
//         error: (err) => {
//           console.error('Error fetching product:', err);
//         },
//       });
//     }
//   }

//   // Event handlers
//   onThumbnailClick(imgSrc: string) {
//     this.mainImage = imgSrc;
//   }

//   onAddToCart() {
//     // Implement your add to cart logic here
//     console.log(`Adding ${this.quantity} of ${this.product.title} to cart.`);
//   }
// }
