import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'app/Models/iproduct';
import { ProductUiHelper } from 'app/services/product-ui-helper';
import { ProductsService } from 'app/services/products-service';
import { PaginatorModule } from 'primeng/paginator';
import { ProductCard } from '../product-card/product-card';
import { ProductsFilter } from '../products-filter/products-filter';
@Component({
  selector: 'app-products',
  imports: [PaginatorModule, ProductCard, ProductsFilter],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products!: IProduct[];
  totalRecords = 0;
  first = 0;
  perPage = 8; // items per page
  category!: string | null;
  name!: string | null;
  price: number | null = null;
  searchParams: { [key: string]: any } = {};

  /**
   *
   */
  constructor(
    private _productsService: ProductsService,
    public _productUiHelper: ProductUiHelper,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      // Create a dynamic params object from the URL
      params.keys.forEach((key) => {
        this.searchParams[key] = params.get(key);
      });
      this.loadProducts(0, this.perPage, this.searchParams);
    });
  }

  loadProducts(page: number, perPage: number, searchParams?: { [key: string]: any }) {
    this._productsService
      .getProductsWithPagination(page + 1, perPage, searchParams)
      .subscribe((data) => {
        this.products = data.data;
        this.totalRecords = data.items;
      });
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.perPage = event.rows;
    this.loadProducts(event.page, event.rows, this.searchParams);
  }
  onFilterChange(filters: any) {
    this.searchParams = filters;
    this.loadProducts(0, this.perPage, filters);
  }
}
