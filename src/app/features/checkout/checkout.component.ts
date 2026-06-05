import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CheckoutPayload } from '../../core/models/checkout.model';
import { CartService } from '../../core/services/cart.service';
import { CheckoutService } from '../../core/services/checkout.service';
import { PricePipe } from '../../shared/pipes/price.pipe';

const SHIPPING_CENTS = 999;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PricePipe],
  template: `
    <div class="app-container py-10">
      <h1>Checkout</h1>
      <p class="mt-2 text-body-md text-ink-secondary">Complete your order — payment integration coming soon.</p>

      @if (submitError()) {
        <p class="mt-4 text-body-sm text-danger">{{ submitError() }}</p>
      }

      <form class="mt-8 lg:grid lg:grid-cols-[1fr_20rem] lg:gap-10" [formGroup]="form" (ngSubmit)="submit()">
        <div class="space-y-8">
          <fieldset class="card space-y-4">
            <legend class="text-heading-md text-ink">Contact</legend>
            <div>
              <label class="label" for="fullName">Full name</label>
              <input id="fullName" type="text" class="input" formControlName="fullName" autocomplete="name" />
            </div>
            <div>
              <label class="label" for="email">Email</label>
              <input id="email" type="email" class="input" formControlName="email" autocomplete="email" />
            </div>
            <div>
              <label class="label" for="phone">Phone</label>
              <input id="phone" type="tel" class="input" formControlName="phone" autocomplete="tel" />
            </div>
          </fieldset>

          <fieldset class="card space-y-4">
            <legend class="text-heading-md text-ink">Shipping address</legend>
            <div>
              <label class="label" for="line1">Address</label>
              <input id="line1" type="text" class="input" formControlName="line1" autocomplete="street-address" />
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="label" for="city">City</label>
                <input id="city" type="text" class="input" formControlName="city" autocomplete="address-level2" />
              </div>
              <div>
                <label class="label" for="postalCode">Postal code</label>
                <input id="postalCode" type="text" class="input" formControlName="postalCode" autocomplete="postal-code" />
              </div>
            </div>
            <div>
              <label class="label" for="country">Country</label>
              <input id="country" type="text" class="input" formControlName="country" autocomplete="country-name" />
            </div>
          </fieldset>

          <button type="submit" class="btn-primary btn-lg w-full sm:w-auto" [disabled]="form.invalid || submitting()">
            {{ submitting() ? 'Placing order…' : 'Place order' }}
          </button>
        </div>

        <aside>
          <div class="card lg:sticky lg:top-24">
            <h2 class="text-heading-md text-ink">Your order</h2>
            <ul class="mt-4 space-y-3 border-b border-line pb-4">
              @for (line of cart.lines(); track line.variantId) {
                <li class="flex justify-between gap-2 text-body-sm">
                  <span class="text-ink-secondary">
                    {{ line.kitName }} × {{ line.quantity }}
                  </span>
                  <span class="shrink-0 text-ink">{{ line.priceCents * line.quantity | price }}</span>
                </li>
              }
            </ul>
            <dl class="mt-4 space-y-2 text-body-md">
              <div class="flex justify-between">
                <dt class="text-ink-secondary">Subtotal</dt>
                <dd>{{ cart.subtotalCents() | price }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-ink-secondary">Shipping</dt>
                <dd>{{ shippingCents | price }}</dd>
              </div>
              <div class="flex justify-between text-heading-md">
                <dt>Total</dt>
                <dd>{{ cart.subtotalCents() + shippingCents | price }}</dd>
              </div>
            </dl>
          </div>
          <a routerLink="/cart" class="btn-ghost btn-sm mt-4 inline-block no-underline">Back to cart</a>
        </aside>
      </form>
    </div>
  `,
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  readonly cart = inject(CartService);
  private readonly checkout = inject(CheckoutService);
  private readonly router = inject(Router);

  readonly shippingCents = SHIPPING_CENTS;
  readonly submitting = signal(false);
  readonly submitError = signal('');

  readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    line1: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['France', Validators.required],
  });

  submit(): void {
    if (this.form.invalid || this.cart.isEmpty()) {
      return;
    }
    const v = this.form.getRawValue();
    const subtotalCents = this.cart.subtotalCents();
    const payload: CheckoutPayload = {
      customer: {
        fullName: v.fullName,
        email: v.email,
        phone: v.phone,
      },
      address: {
        line1: v.line1,
        city: v.city,
        postalCode: v.postalCode,
        country: v.country,
      },
      lines: [...this.cart.lines()],
      subtotalCents,
      shippingCents: this.shippingCents,
      totalCents: subtotalCents + this.shippingCents,
    };
    this.submitting.set(true);
    this.submitError.set('');
    this.checkout.placeOrder(payload).subscribe({
      next: (order) => {
        this.cart.clear();
        this.router.navigate(['/order', order.id]);
      },
      error: () => {
        this.submitting.set(false);
        this.submitError.set('Could not place your order. Please try again.');
      },
    });
  }
}
