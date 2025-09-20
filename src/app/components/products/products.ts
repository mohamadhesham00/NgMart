import { Component } from '@angular/core';
import { IProduct } from 'app/Models/iproduct';
import { AuthService } from 'app/services/auth-service';
import { ProductUiHelper } from 'app/services/product-ui-helper';
import { ProductsService } from 'app/services/products-service';
import { PaginatorModule } from 'primeng/paginator';
import { ProductCard } from '../product-card/product-card';
@Component({
  selector: 'app-products',
  imports: [PaginatorModule, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products!: IProduct[];
  totalRecords = 0;
  first = 0;
  perPage = 8; // items per page

  /**
   *
   */
  constructor(
    private _productsService: ProductsService,
    public _productUiHelper: ProductUiHelper,
    private _authService: AuthService
  ) {
    console.log('In Products Ctor');
    _authService
      .signUp({ userName: 'test', email: 'test@example.com', password: '123456' })
      .subscribe({
        next: (response) => {
          console.log('User created successfully!', response);
          // Clear the form or navigate away
        },
        error: (error) => {
          console.error('There was an error creating the user.', error);
        },
      });
  }
  ngOnInit() {
    this.loadProducts(0, this.perPage);
  }

  loadProducts(page: number, perPage: number) {
    this._productsService.getProductsWithPagination(page + 1, perPage).subscribe((data) => {
      this.products = data.data;
      this.totalRecords = data.items;
    });
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.perPage = event.rows;
    this.loadProducts(event.page, event.rows);
  }
}
