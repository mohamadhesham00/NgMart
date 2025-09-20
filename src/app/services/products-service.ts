import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'app/Models/iproduct';
import { PaginatedResponse } from 'app/Models/paginated-response';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private base = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.base}/products`);
  }
  getProductsWithPagination(
    page: number,
    perPage: number
  ): Observable<PaginatedResponse<IProduct>> {
    const params = new HttpParams().set('_page', page).set('_per_page', perPage);

    return this.http.get<PaginatedResponse<IProduct>>(`${this.base}/products`, { params });
  }
  getProductByID(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.base}/products/${id}`);
  }
}
