import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'app/Models/iproduct';
import { PaginatedResponse } from 'app/Models/paginated-response';
import { environment } from 'environments/environment.development';
import { map, Observable } from 'rxjs';

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
    perPage: number,
    params?: { [key: string]: any }
  ): Observable<PaginatedResponse<IProduct>> {
    let httpParams = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', perPage.toString());

    // Add filters / search params
    if (params) {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key) && params[key] != null) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    return this.http
      .get<IProduct[]>(`${this.base}/products`, {
        params: httpParams,
        observe: 'response', // 👈 include headers
      })
      .pipe(
        map((res) => {
          const total = Number(res.headers.get('X-Total-Count')) || 0;
          return {
            data: res.body ?? [], // ✅ force [] if null
            items: total,
          } as PaginatedResponse<IProduct>;
        })
      );
  }

  getProductByID(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.base}/products/${id}`);
  }
  loadProductCarousel() {
    return this.getProductsWithPagination(3, 10);
  }
  getUniqueCategories(): Observable<string[]> {
    return this.http
      .get<IProduct[]>(`${this.base}/products`)
      .pipe(map((products) => [...new Set(products.map((p) => p.category))]));
  }
  getPriceRange(): Observable<{ min: number; max: number }> {
    return this.http.get<IProduct[]>(`${this.base}/products`).pipe(
      map((products) => {
        const prices = products.map((p) => p.price);
        return {
          min: Math.min(...prices),
          max: Math.max(...prices),
        };
      })
    );
  }
}
