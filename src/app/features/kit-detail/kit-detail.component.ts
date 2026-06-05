import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Kit } from '../../core/models/kit.model';
import { CartService } from '../../core/services/cart.service';
import { formatFitments } from '../../core/utils/fitment.util';
import { KIT_REPOSITORY } from '../../data/repositories/kit.repository';
import { PricePipe } from '../../shared/pipes/price.pipe';
import { LoadingSkeletonComponent } from '../../shared/ui/loading-skeleton/loading-skeleton.component';
import { KitImageComponent } from '../../shared/ui/kit-image/kit-image.component';
import { QuantityControlComponent } from '../../shared/ui/quantity-control/quantity-control.component';

@Component({
  selector: 'app-kit-detail',
  standalone: true,
  imports: [RouterLink, PricePipe, QuantityControlComponent, LoadingSkeletonComponent, KitImageComponent],
  template: `
    <div class="app-container py-10" [class.pb-28]="kit()">
      @if (loading()) {
        <app-loading-skeleton [count]="1" gridClass="max-w-2xl" />
      } @else if (!kit()) {
        <div class="card max-w-lg text-center">
          <h1 class="text-display-sm">Kit not found</h1>
          <p class="mt-2 text-body-md text-ink-secondary">This kit may have been removed or the link is incorrect.</p>
          <a routerLink="/kits" class="btn-primary btn-sm mt-6 inline-flex no-underline">Back to catalog</a>
        </div>
      } @else {
        <div class="lg:grid lg:grid-cols-2 lg:gap-12">
          <div class="lg:sticky lg:top-24 lg:self-start">
            <app-kit-image
              class="block rounded-lg"
              [src]="activeImage()"
              [alt]="kit()!.name"
              [colorHex]="selectedVariant()?.colorHex"
              aspectClass="aspect-[4/3] w-full rounded-lg"
            />
            @if (kit()!.images.length > 1) {
              <div class="mt-3 flex gap-2 overflow-x-auto">
                @for (img of kit()!.images; track img) {
                  <button
                    type="button"
                    class="h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors"
                    [class.border-brand]="activeImage() === img"
                    [class.border-line]="activeImage() !== img"
                    (click)="activeImage.set(img)"
                  >
                    <app-kit-image [src]="img" [alt]="kit()!.name" aspectClass="aspect-[4/3] h-full w-full" />
                  </button>
                }
              </div>
            }
          </div>

          <div>
            <div class="flex flex-wrap gap-2">
              @for (f of kit()!.fitments; track f.model + f.yearFrom) {
                <span class="badge-fitment">{{ f.make }} {{ f.model }}</span>
              }
            </div>

            <h1 class="mt-4">{{ kit()!.name }}</h1>
            <p class="mt-4 text-body-lg text-ink-secondary">{{ kit()!.description }}</p>

            <div class="mt-6 rounded-lg border border-line bg-surface-subtle p-4">
              <p class="text-label-sm uppercase tracking-widest text-ink-muted">Compatibility</p>
              <p class="mt-1 text-body-md text-ink">{{ fitmentSummary() }}</p>
            </div>

            <div class="mt-8">
              <p class="label">Finish / color</p>
              <div class="mt-2 flex flex-wrap gap-2">
                @for (variant of kit()!.variants; track variant.id) {
                  <button
                    type="button"
                    class="rounded-md border px-4 py-2 text-label-md transition-colors duration-fast"
                    [class.border-brand]="selectedVariantId() === variant.id"
                    [class.bg-brand-50]="selectedVariantId() === variant.id"
                    [class.border-line]="selectedVariantId() !== variant.id"
                    (click)="selectVariant(variant.id)"
                  >
                    @if (variant.colorHex) {
                      <span
                        class="mr-2 inline-block h-3 w-3 rounded-full border border-line"
                        [style.background]="variant.colorHex"
                      ></span>
                    }
                    {{ variant.label }}
                  </button>
                }
              </div>
            </div>

            <p class="mt-8 text-display-sm text-ink">{{ priceCents() | price }}</p>
            <p class="text-body-sm text-ink-muted">SKU: {{ selectedVariant()?.sku }}</p>

            <div class="mt-6 flex flex-wrap items-center gap-4">
              <app-quantity-control
                [quantity]="quantity()"
                (quantityChange)="quantity.set($event)"
              />
              <button type="button" class="btn-primary btn-lg flex-1 sm:flex-none" (click)="addToCart()">
                Add to cart
              </button>
            </div>

            @if (added()) {
              <p class="mt-3 text-body-sm text-success">Added to cart.</p>
            }

            <div class="mt-10">
              <h2 class="text-heading-md text-ink">What&apos;s included</h2>
              <ul class="mt-3 list-inside list-disc space-y-1 text-body-md text-ink-secondary">
                @for (item of kit()!.includes; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
          </div>
        </div>

        <div class="fixed bottom-0 left-0 right-0 border-t border-line bg-surface p-4 lg:hidden">
          <div class="app-container flex items-center justify-between gap-4">
            <p class="text-heading-md text-ink">{{ priceCents() | price }}</p>
            <button type="button" class="btn-primary" (click)="addToCart()">Add to cart</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class KitDetailComponent implements OnInit {
  private readonly kitRepo = inject(KIT_REPOSITORY);
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService);

  readonly kit = signal<Kit | null>(null);
  readonly loading = signal(true);
  readonly selectedVariantId = signal<string>('');
  readonly quantity = signal(1);
  readonly added = signal(false);
  readonly activeImage = signal('');

  readonly selectedVariant = computed(() => {
    const k = this.kit();
    const id = this.selectedVariantId();
    return k?.variants.find((v) => v.id === id);
  });

  readonly priceCents = computed(() => this.selectedVariant()?.priceCents ?? 0);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (!slug) {
        this.loading.set(false);
        return;
      }
      this.loading.set(true);
      this.added.set(false);
      this.kitRepo.getBySlug(slug).subscribe((kit) => {
        this.kit.set(kit ?? null);
        if (kit?.variants.length) {
          this.selectedVariantId.set(kit.variants[0].id);
        }
        this.activeImage.set(kit?.images[0] ?? '');
        this.loading.set(false);
      });
    });
  }

  fitmentSummary(): string {
    const k = this.kit();
    return k ? formatFitments(k.fitments) : '';
  }

  selectVariant(id: string): void {
    this.selectedVariantId.set(id);
    this.added.set(false);
  }

  addToCart(): void {
    const k = this.kit();
    const v = this.selectedVariant();
    if (!k || !v) {
      return;
    }
    this.cart.addLine(k, v, this.quantity());
    this.added.set(true);
  }
}
