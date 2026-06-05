import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Kit } from '../../../core/models/kit.model';
import { PricePipe } from '../../pipes/price.pipe';
import { KitImageComponent } from '../kit-image/kit-image.component';

@Component({
  selector: 'app-kit-card',
  standalone: true,
  imports: [RouterLink, PricePipe, KitImageComponent],
  template: `
    <article class="card-kit flex h-full flex-col">
      <a [routerLink]="['/kits', kit().slug]" class="block no-underline">
        <app-kit-image
          [src]="kit().images[0]"
          [alt]="kit().name"
          [colorHex]="kit().variants[0]?.colorHex"
        />
      </a>
      <div class="flex flex-1 flex-col p-4">
        <div class="mb-2 flex flex-wrap gap-2">
          @for (fitment of kit().fitments.slice(0, 1); track fitment.model) {
            <span class="badge-fitment">{{ fitment.model }}</span>
          }
          @if (kit().fitments.length > 0) {
            <span class="badge-neutral">{{ yearRange(kit().fitments[0]) }}</span>
          }
        </div>
        <a [routerLink]="['/kits', kit().slug]" class="no-underline">
          <h3 class="font-display text-xl uppercase tracking-wide text-ink">{{ kit().name }}</h3>
        </a>
        <p class="mt-1 flex-1 text-body-sm text-ink-secondary">{{ kit().shortDescription }}</p>
        <div class="mt-4 flex items-center justify-between gap-2">
          <p class="text-heading-md text-ink">{{ lowestPriceCents() | price }}</p>
          <a [routerLink]="['/kits', kit().slug]" class="btn-primary btn-sm no-underline">View kit</a>
        </div>
      </div>
    </article>
  `,
})
export class KitCardComponent {
  readonly kit = input.required<Kit>();

  lowestPriceCents(): number {
    const variants = this.kit().variants;
    return Math.min(...variants.map((v) => v.priceCents));
  }

  yearRange(fitment: { yearFrom: number; yearTo: number }): string {
    if (fitment.yearFrom === fitment.yearTo) {
      return String(fitment.yearFrom);
    }
    return `${fitment.yearFrom}–${fitment.yearTo}`;
  }
}
