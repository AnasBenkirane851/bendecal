import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { CatalogFilters } from '../../core/models/catalog-filters.model';
import { Fitment } from '../../core/models/fitment.model';
import { Kit } from '../../core/models/kit.model';
import { KITS_MOCK } from '../mocks/kits.mock';
import { KitRepository } from './kit.repository';

const MOCK_DELAY_MS = 300;

function matchesFitment(fitment: Fitment, filters: CatalogFilters): boolean {
  if (filters.make && fitment.make !== filters.make) {
    return false;
  }
  if (filters.model && fitment.model !== filters.model) {
    return false;
  }
  if (filters.year !== undefined) {
    if (filters.year < fitment.yearFrom || filters.year > fitment.yearTo) {
      return false;
    }
  }
  return true;
}

function filterKits(kits: Kit[], filters?: CatalogFilters): Kit[] {
  if (!filters?.make && !filters?.model && filters?.year === undefined) {
    return kits;
  }
  return kits.filter((kit) => kit.fitments.some((f) => matchesFitment(f, filters)));
}

@Injectable()
export class MockKitRepository implements KitRepository {
  getAll(filters?: CatalogFilters): Observable<Kit[]> {
    return of(filterKits([...KITS_MOCK], filters)).pipe(delay(MOCK_DELAY_MS));
  }

  getBySlug(slug: string): Observable<Kit | undefined> {
    const kit = KITS_MOCK.find((k) => k.slug === slug);
    return of(kit).pipe(delay(MOCK_DELAY_MS));
  }

  getFeatured(limit = 3): Observable<Kit[]> {
    const featured = KITS_MOCK.filter((k) => k.featured).slice(0, limit);
    return of(featured).pipe(delay(MOCK_DELAY_MS));
  }
}
