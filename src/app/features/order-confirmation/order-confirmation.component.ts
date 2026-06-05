import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../../core/models/checkout.model';
import { CheckoutService } from '../../core/services/checkout.service';
import { PricePipe } from '../../shared/pipes/price.pipe';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [RouterLink, PricePipe],
  template: `
    <div class="app-container py-10">
      @if (loading()) {
        <p class="text-body-md text-ink-secondary">Loading order…</p>
      } @else if (!order()) {
        <div class="card max-w-lg text-center">
          <h1 class="text-display-sm">Order not found</h1>
          <p class="mt-2 text-body-md text-ink-secondary">We could not find this order. It may have expired from your session.</p>
          <a routerLink="/kits" class="btn-primary btn-sm mt-6 inline-flex no-underline">Browse kits</a>
        </div>
      } @else {
        <div class="mx-auto max-w-2xl text-center">
          <span class="badge-success">Order confirmed</span>
          <h1 class="mt-4">Thank you!</h1>
          <p class="mt-4 text-body-lg text-ink-secondary">
            Your order <strong class="text-ink">{{ order()!.id }}</strong> has been placed.
            A confirmation email has been sent to {{ order()!.customer.email }}.
          </p>
        </div>

        <div class="card mx-auto mt-10 max-w-2xl">
          <h2 class="text-heading-md text-ink">Order summary</h2>
          <ul class="mt-4 space-y-3 border-b border-line pb-4">
            @for (line of order()!.lines; track line.variantId) {
              <li class="flex justify-between gap-4 text-body-sm">
                <span class="text-ink-secondary">{{ line.kitName }} — {{ line.variantLabel }} × {{ line.quantity }}</span>
                <span class="text-ink">{{ line.priceCents * line.quantity | price }}</span>
              </li>
            }
          </ul>
          <dl class="mt-4 space-y-2 text-body-md">
            <div class="flex justify-between">
              <dt class="text-ink-secondary">Subtotal</dt>
              <dd>{{ order()!.subtotalCents | price }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-ink-secondary">Shipping</dt>
              <dd>{{ order()!.shippingCents | price }}</dd>
            </div>
            <div class="flex justify-between text-heading-md">
              <dt>Total paid</dt>
              <dd>{{ order()!.totalCents | price }}</dd>
            </div>
          </dl>
          <div class="mt-6 border-t border-line pt-4 text-left text-body-sm text-ink-secondary">
            <p class="font-medium text-ink">Ship to</p>
            <p class="mt-1">{{ order()!.customer.fullName }}</p>
            <p>{{ order()!.address.line1 }}</p>
            <p>{{ order()!.address.postalCode }} {{ order()!.address.city }}</p>
            <p>{{ order()!.address.country }}</p>
          </div>
        </div>

        <div class="mt-10 text-center">
          <a routerLink="/kits" class="btn-primary no-underline">Continue shopping</a>
        </div>
      }
    </div>
  `,
})
export class OrderConfirmationComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly checkout = inject(CheckoutService);

  readonly order = signal<Order | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.order.set(null);
        this.loading.set(false);
        return;
      }
      this.loading.set(true);
      this.checkout.getOrderById(id).subscribe({
        next: (order) => {
          this.order.set(order);
          this.loading.set(false);
        },
        error: () => {
          this.order.set(null);
          this.loading.set(false);
        },
      });
    });
  }
}
