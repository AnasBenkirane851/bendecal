import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { API_BASE_URL } from '../tokens/api-url.token';
import { CheckoutPayload, Order } from '../models/checkout.model';

const ORDER_STORAGE_KEY = 'bendecal.lastOrder';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  placeOrder(payload: CheckoutPayload): Observable<Order> {
    return this.http.post<Order>(`${this.apiBaseUrl}/orders`, payload).pipe(
      tap((order) => sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order)))
    );
  }

  getOrderById(id: string): Observable<Order | null> {
    return this.http.get<Order>(`${this.apiBaseUrl}/orders/${id}`).pipe(
      tap((order) => sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order))),
      catchError(() => of(this.getCachedOrder(id)))
    );
  }

  private getCachedOrder(id: string): Order | null {
    try {
      const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const order = JSON.parse(raw) as Order;
      return order.id === id ? order : null;
    } catch {
      return null;
    }
  }
}
