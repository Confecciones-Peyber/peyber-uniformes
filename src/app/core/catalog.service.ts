import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product, Category, QuoteRequest } from './types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private http = inject(HttpClient);
  
  private getHeaders() {
    return new HttpHeaders({
      'x-api-key': environment.catalogApiKey || 'peyber_catalog_dev_secret_key_2026'
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/catalog/public/categories`, { headers: this.getHeaders() });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/catalog/public/products`, { headers: this.getHeaders() });
  }

  submitQuotation(quote: QuoteRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/catalog/public/quotations`, quote, { headers: this.getHeaders() });
  }
}
