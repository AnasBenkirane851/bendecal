import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogFilters } from '../../core/models/catalog-filters.model';
import { Kit } from '../../core/models/kit.model';
import { KIT_REPOSITORY } from '../../data/repositories/kit.repository';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
import { FitmentFilterComponent } from '../../shared/ui/fitment-filter/fitment-filter.component';
import { KitCardComponent } from '../../shared/ui/kit-card/kit-card.component';
import { LoadingSkeletonComponent } from '../../shared/ui/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [FitmentFilterComponent, KitCardComponent, LoadingSkeletonComponent, EmptyStateComponent],
  template: `
    <div class="app-container py-10">
      <header class="mb-8">
        <h1>Decal kits</h1>
        <p class="mt-2 max-w-prose text-body-lg text-ink-secondary">
          Find graphics engineered for your bike. Filter by make, model, and year.
        </p>
      </header>

      <div class="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
        <aside class="mb-8 lg:mb-0">
          <div class="card lg:sticky lg:top-24">
            <h2 class="mb-4 text-heading-sm text-ink">Fitment</h2>
            <app-fitment-filter [initial]="filters()" (filtersChange)="onFiltersChange($event)" />
          </div>
        </aside>

        <section aria-live="polite">
          @if (loading()) {
            <app-loading-skeleton />
          } @else if (kits().length === 0) {
            <app-empty-state
              title="No kits found"
              message="Try adjusting your fitment filters or browse all kits."
            />
            <button type="button" class="btn-primary btn-sm mt-6" (click)="clearFilters()">Clear filters</button>
          } @else {
            <p class="mb-4 text-body-sm text-ink-muted">{{ kits().length }} kit(s)</p>
            <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              @for (kit of kits(); track kit.id) {
                <app-kit-card [kit]="kit" />
              }
            </div>
          }
        </section>
      </div>
    </div>
  `,
})
export class CatalogComponent implements OnInit {
  private readonly kitRepo = inject(KIT_REPOSITORY);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly filters = signal<CatalogFilters>({});
  readonly kits = signal<Kit[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const filters: CatalogFilters = {};
      const make = params.get('make');
      const model = params.get('model');
      const year = params.get('year');
      if (make) {
        filters.make = make;
      }
      if (model) {
        filters.model = model;
      }
      if (year) {
        filters.year = Number(year);
      }
      this.filters.set(filters);
      this.loadKits(filters);
    });
  }

  clearFilters(): void {
    this.router.navigate(['/kits']);
  }

  onFiltersChange(filters: CatalogFilters): void {
    const queryParams: Record<string, string | number> = {};
    if (filters.make) {
      queryParams['make'] = filters.make;
    }
    if (filters.model) {
      queryParams['model'] = filters.model;
    }
    if (filters.year !== undefined) {
      queryParams['year'] = filters.year;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: '',
    });
  }

  private loadKits(filters: CatalogFilters): void {
    this.loading.set(true);
    this.kitRepo.getAll(filters).subscribe({
      next: (kits) => {
        this.kits.set(kits);
        this.loading.set(false);
      },
      error: () => {
        this.kits.set([]);
        this.loading.set(false);
      },
    });
  }
}
