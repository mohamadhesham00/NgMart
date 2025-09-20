import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IProduct } from 'app/Models/iproduct';
import { ProductUiHelper } from 'app/services/product-ui-helper';
import { ProductsService } from 'app/services/products-service';
import { Carousel } from 'primeng/carousel';
import { map, Observable } from 'rxjs';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.html',
  styleUrl: './product-carousel.css',
  imports: [Carousel, ProductCard, CommonModule],
})
export class ProductCarousel {
  responsiveOptions: any[] | undefined;
  products$!: Observable<IProduct[]>;
  /**
   *
   */
  constructor(private _productsService: ProductsService, public _productUiHelper: ProductUiHelper) {
    console.log('ProductCarousel component initialized');
  }
  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
      // Add a default for screens larger than 1400px
      {
        breakpoint: '9999px', // Use a large value like this
        numVisible: 5, // Set your desired default number of items
        numScroll: 1,
      },
    ];
    this.products$ = this._productsService
      .getProductsWithPagination(3, 10)
      .pipe(map((res) => res.data));
  }
}
