import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from 'app/services/products-service';

@Component({
  selector: 'app-products-filter',
  imports: [FormsModule, CommonModule],
  templateUrl: './products-filter.html',
  styleUrl: './products-filter.css',
})
export class ProductsFilter {
  categories!: string[];
  selectedCategory: string | null = null;
  // price: number = 0;
  // minPrice: number = 0;
  // maxPrice: number = 0;
  @Output() filterChange = new EventEmitter<any>();
  /**
   *
   */
  constructor(private _productsService: ProductsService) {}
  ngOnInit() {
    this._productsService.getUniqueCategories().subscribe((data) => {
      this.categories = data;
    });
    // this._productsService.getPriceRange().subscribe((data) => {
    //   this.minPrice = data.min;
    //   this.maxPrice = data.max;
    // });
  }
  applyFilter() {
    let filters: { [key: string]: any } = {};
    if (this.selectedCategory) filters['category'] = this.selectedCategory;
    // if (this.price) filters['price'] = this.price;
    this.filterChange.emit(filters);
  }

  clearFilter() {
    this.selectedCategory = null;
    // this.price = 0;
    this.filterChange.emit({});
  }
}
