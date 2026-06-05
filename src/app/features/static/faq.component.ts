import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="app-container py-10 md:py-14">
      <p class="text-label-sm uppercase tracking-widest text-brand">FAQ</p>
      <h1 class="mt-2">Common questions</h1>

      <div class="mt-10 max-w-3xl space-y-6">
        <section class="card">
          <h2 class="text-heading-md text-ink">Will this kit fit my bike?</h2>
          <p class="mt-2 text-body-md text-ink-secondary">
            Every kit lists compatible make, model, and year range. Use catalog filters before ordering. If your year is
            outside the range, contact us before purchase.
          </p>
        </section>
        <section class="card">
          <h2 class="text-heading-md text-ink">What is included?</h2>
          <p class="mt-2 text-body-md text-ink-secondary">
            Each product page shows the full piece list (tank, tail, fairings, etc.) and available finish variants. Kits
            include an install guide unless noted otherwise.
          </p>
        </section>
        <section class="card">
          <h2 class="text-heading-md text-ink">Matte vs gloss — which should I choose?</h2>
          <p class="mt-2 text-body-md text-ink-secondary">
            Gloss highlights lines and looks wet; matte is stealthier and hides light scratches better. Variant labels on
            each kit describe the finish. Samples are not offered on every SKU yet.
          </p>
        </section>
        <section class="card">
          <h2 class="text-heading-md text-ink">Shipping and delivery</h2>
          <p class="mt-2 text-body-md text-ink-secondary">
            Shipping is calculated at checkout. Delivery times depend on your region and order volume. You will receive
            tracking when your order ships.
          </p>
        </section>
        <section class="card">
          <h2 class="text-heading-md text-ink">Returns and fitment issues</h2>
          <p class="mt-2 text-body-md text-ink-secondary">
            Unopened kits in resaleable condition may be returned within 14 days. Custom or installed graphics cannot be
            refunded. Wrong fitment ordered — reach out before applying vinyl.
          </p>
        </section>
      </div>

      <p class="mt-10 text-body-md text-ink-secondary">
        Still stuck?
        <a routerLink="/contact" class="font-medium text-brand no-underline hover:text-brand-700">Contact us</a>.
      </p>
    </div>
  `,
})
export class FaqComponent {}
