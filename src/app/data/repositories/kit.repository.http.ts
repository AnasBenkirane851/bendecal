import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API_BASE_URL } from '../../core/tokens/api-url.token';
import { CatalogFilters } from '../../core/models/catalog-filters.model';
import { Kit } from '../../core/models/kit.model';
import { withDefaultKitImages } from '../mocks/kit-images';
import { KitRepository } from './kit.repository';

@Injectable()
export class HttpKitRepository implements KitRepository {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getAll(filters?: CatalogFilters): Observable<Kit[]> {
    let params = new HttpParams();
    if (filters?.make) {
      params = params.set('make', filters.make);
    }
    if (filters?.model) {
      params = params.set('model', filters.model);
    }
    if (filters?.year !== undefined) {
      params = params.set('year', filters.year);
    }
    return this.http.get<Kit[]>(`${this.apiBaseUrl}/kits`, { params }).pipe(
      map((kits) => kits.map((k) => withDefaultKitImages(k)))
    );
  }

  getBySlug(slug: string): Observable<Kit | undefined> {
    return this.http.get<Kit>(`${this.apiBaseUrl}/kits/${slug}`).pipe(
      map((kit) => withDefaultKitImages(kit)),
      catchError(() => of(undefined))
    );
  }

  getFeatured(limit = 3): Observable<Kit[]> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<Kit[]>(`${this.apiBaseUrl}/kits/featured`, { params }).pipe(
      map((kits) => kits.map((k) => withDefaultKitImages(k)))
    );
  }
}
