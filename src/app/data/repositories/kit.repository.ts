import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogFilters } from '../../core/models/catalog-filters.model';
import { Kit } from '../../core/models/kit.model';

export interface KitRepository {
  getAll(filters?: CatalogFilters): Observable<Kit[]>;
  getBySlug(slug: string): Observable<Kit | undefined>;
  getFeatured(limit?: number): Observable<Kit[]>;
}

export const KIT_REPOSITORY = new InjectionToken<KitRepository>('KIT_REPOSITORY');
