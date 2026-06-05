import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="app-container py-10 md:py-14">
      <p class="text-label-sm uppercase tracking-widest text-brand">How it works</p>
      <h1 class="mt-2">From catalog to installed graphics</h1>
      <p class="mt-4 max-w-prose text-body-lg text-ink-secondary">
        Bendecal kits are engineered for specific motorcycles. Each listing shows make, model, and year range so you
        order with confidence.
      </p>

      <ol class="mt-12 grid gap-8 md:grid-cols-3">
        <li class="card">
          <span class="font-display text-4xl text-brand">01</span>
          <h2 class="mt-4 text-heading-md text-ink">Find your fitment</h2>
          <p class="mt-2 text-body-sm text-ink-secondary">
            Use the catalog filters by make, model, and year. Open a kit to see variants, what is included, and
            compatibility details.
          </p>
        </li>
        <li class="card">
          <span class="font-display text-4xl text-brand">02</span>
          <h2 class="mt-4 text-heading-md text-ink">Order your kit</h2>
          <p class="mt-2 text-body-sm text-ink-secondary">
            Choose your finish or color variant, add to cart, and complete checkout. You will receive confirmation with
            your order reference.
          </p>
        </li>
        <li class="card">
          <span class="font-display text-4xl text-brand">03</span>
          <h2 class="mt-4 text-heading-md text-ink">Print &amp; install</h2>
          <p class="mt-2 text-body-sm text-ink-secondary">
            Kits are produced for professional vinyl application. Follow the included piece list and install guide for
            best results on tank, tail, and fairings.
          </p>
        </li>
      </ol>

      <div class="mt-12 text-center">
        <a routerLink="/kits" class="btn-primary btn-lg no-underline">Browse kits</a>
      </div>
    </div>
  `,
})
export class HowItWorksComponent {}
