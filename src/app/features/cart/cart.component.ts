import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../shared/pipes/price.pipe';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
import { KitImageComponent } from '../../shared/ui/kit-image/kit-image.component';
import { QuantityControlComponent } from '../../shared/ui/quantity-control/quantity-control.component';

const SHIPPING_CENTS = 999;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, PricePipe, QuantityControlComponent, EmptyStateComponent, KitImageComponent],
  template: `
    <div class="app-container py-10">
      <h1>Your cart</h1>

      @if (cart.isEmpty()) {
        <div class="mt-8">
          <app-empty-state
            title="Your cart is empty"
            message="Browse our decal kits and add one that fits your bike."
            actionLabel="Browse kits"
            actionLink="/kits"
          />
        </div>
      } @else {
        <div class="mt-8 lg:grid lg:grid-cols-[1fr_20rem] lg:gap-10">
          <ul class="space-y-4">
            @for (line of cart.lines(); track line.variantId) {
              <li class="card flex flex-col gap-4 sm:flex-row sm:items-center">
                <app-kit-image
                  class="h-24 w-full shrink-0 sm:w-32"
                  [src]="line.image"
                  [alt]="line.kitName"
                  aspectClass="aspect-[4/3] h-24 w-full sm:w-32 rounded-md"
                />
                <div class="min-w-0 flex-1">
                  <a [routerLink]="['/kits', line.kitSlug]" class="font-display text-lg uppercase text-ink no-underline">
                    {{ line.kitName }}
                  </a>
                  <p class="text-body-sm text-ink-secondary">{{ line.variantLabel }}</p>
                  <p class="text-caption text-ink-muted">SKU: {{ line.sku }}</p>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <app-quantity-control
                    [quantity]="line.quantity"
                    (quantityChange)="cart.updateQuantity(line.variantId, $event)"
                  />
                  <p class="text-heading-md text-ink">{{ line.priceCents * line.quantity | price }}</p>
                  <button
                    type="button"
                    class="btn-ghost btn-sm text-danger"
                    (click)="cart.removeLine(line.variantId)"
                  >
                    Remove
                  </button>
                </div>
              </li>
            }
          </ul>

          <aside class="mt-8 lg:mt-0">
            <div class="card lg:sticky lg:top-24">
              <h2 class="text-heading-md text-ink">Order summary</h2>
              <dl class="mt-4 space-y-2 text-body-md">
                <div class="flex justify-between">
                  <dt class="text-ink-secondary">Subtotal</dt>
                  <dd class="text-ink">{{ cart.subtotalCents() | price }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-ink-secondary">Shipping</dt>
                  <dd class="text-ink">{{ shippingCents | price }}</dd>
                </div>
                <div class="flex justify-between border-t border-line pt-2 text-heading-md">
                  <dt class="text-ink">Estimated total</dt>
                  <dd class="text-ink">{{ cart.subtotalCents() + shippingCents | price }}</dd>
                </div>
              </dl>
              <a routerLink="/checkout" class="btn-primary btn-lg mt-6 block w-full text-center no-underline">
                Checkout
              </a>
              <a routerLink="/kits" class="btn-ghost btn-sm mt-3 block w-full text-center no-underline">
                Continue shopping
              </a>
            </div>
          </aside>
        </div>
      }
    </div>
  `,
})
export class CartComponent {
  readonly cart = inject(CartService);
  readonly shippingCents = SHIPPING_CENTS;
}
