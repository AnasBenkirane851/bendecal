import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatalogFilters } from '../../../core/models/catalog-filters.model';
import { FITMENT_REPOSITORY } from '../../../data/repositories/fitment.repository';

function filtersKey(filters: CatalogFilters): string {
  return `${filters.make ?? ''}|${filters.model ?? ''}|${filters.year ?? ''}`;
}

@Component({
  selector: 'app-fitment-filter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-4">
      <div>
        <label class="label" for="filter-make">Make</label>
        <select
          id="filter-make"
          class="select"
          [ngModel]="make()"
          (ngModelChange)="onMakeChange($event)"
        >
          <option value="">All makes</option>
          @for (m of makes(); track m) {
            <option [value]="m">{{ m }}</option>
          }
        </select>
      </div>

      <div>
        <label class="label" for="filter-model">Model</label>
        <select
          id="filter-model"
          class="select"
          [disabled]="!make()"
          [ngModel]="model()"
          (ngModelChange)="onModelChange($event)"
        >
          <option value="">All models</option>
          @for (m of models(); track m) {
            <option [value]="m">{{ m }}</option>
          }
        </select>
      </div>

      <div>
        <label class="label" for="filter-year">Year</label>
        <select
          id="filter-year"
          class="select"
          [disabled]="!make() || !model()"
          [ngModel]="year()"
          (ngModelChange)="onYearChange($event)"
        >
          <option value="">All years</option>
          @for (y of years(); track y) {
            <option [value]="y">{{ y }}</option>
          }
        </select>
      </div>

      @if (make() || model() || year()) {
        <button type="button" class="btn-ghost btn-sm w-full" (click)="clear()">Clear filters</button>
      }
    </div>
  `,
})
export class FitmentFilterComponent implements OnInit {
  private readonly fitmentRepo = inject(FITMENT_REPOSITORY);

  readonly initial = input<CatalogFilters>({});
  readonly filtersChange = output<CatalogFilters>();

  readonly makes = signal<string[]>([]);
  readonly make = signal('');
  readonly model = signal('');
  readonly year = signal<number | ''>('');

  readonly models = signal<string[]>([]);
  readonly years = signal<number[]>([]);

  private lastSyncedKey = '';

  constructor() {
    effect(
      () => {
        const init = this.initial();
        const key = filtersKey(init);
        if (key === this.lastSyncedKey) {
          return;
        }
        this.lastSyncedKey = key;
        this.make.set(init.make ?? '');
        this.model.set(init.model ?? '');
        this.year.set(init.year ?? '');
        this.refreshOptions();
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.fitmentRepo.getMakes().subscribe((makes) => this.makes.set(makes));
  }

  onMakeChange(value: string): void {
    this.make.set(value);
    this.model.set('');
    this.year.set('');
    this.lastSyncedKey = filtersKey(this.buildFilters());
    this.refreshOptions();
    this.emit();
  }

  onModelChange(value: string): void {
    this.model.set(value);
    this.year.set('');
    this.lastSyncedKey = filtersKey(this.buildFilters());
    this.refreshOptions();
    this.emit();
  }

  onYearChange(value: string): void {
    this.year.set(value === '' ? '' : Number(value));
    this.lastSyncedKey = filtersKey(this.buildFilters());
    this.emit();
  }

  clear(): void {
    this.make.set('');
    this.model.set('');
    this.year.set('');
    this.models.set([]);
    this.years.set([]);
    this.lastSyncedKey = '';
    this.emit();
  }

  private refreshOptions(): void {
    const make = this.make();
    if (!make) {
      this.models.set([]);
      this.years.set([]);
      return;
    }
    this.fitmentRepo.getModelsForMake(make).subscribe((models) => this.models.set(models));
    const model = this.model();
    if (model) {
      this.fitmentRepo.getYearsForMakeModel(make, model).subscribe((years) => this.years.set(years));
    } else {
      this.years.set([]);
    }
  }

  private buildFilters(): CatalogFilters {
    const filters: CatalogFilters = {};
    if (this.make()) {
      filters.make = this.make();
    }
    if (this.model()) {
      filters.model = this.model();
    }
    const year = this.year();
    if (year !== '') {
      filters.year = year;
    }
    return filters;
  }

  private emit(): void {
    this.filtersChange.emit(this.buildFilters());
  }
}
