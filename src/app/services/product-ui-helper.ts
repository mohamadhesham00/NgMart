import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductUiHelper {
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return;
  }
}
