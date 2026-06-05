import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="app-container py-10 md:py-14">
      <p class="text-label-sm uppercase tracking-widest text-brand">Contact</p>
      <h1 class="mt-2">Get in touch</h1>
      <p class="mt-4 max-w-prose text-body-lg text-ink-secondary">
        Questions about fitment, bulk orders, or a kit you do not see in the catalog — we are happy to help.
      </p>

      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <section class="card">
          <h2 class="text-heading-md text-ink">Email</h2>
          <p class="mt-2 text-body-md text-ink-secondary">
            <a [href]="emailHref" class="font-medium text-brand no-underline hover:text-brand-700">
              {{ email }}
            </a>
          </p>
          <p class="mt-4 text-body-sm text-ink-muted">We aim to reply within 1–2 business days.</p>
        </section>
        <section class="card">
          <h2 class="text-heading-md text-ink">Before you write</h2>
          <ul class="mt-2 list-inside list-disc space-y-2 text-body-md text-ink-secondary">
            <li>Your make, model, and year</li>
            <li>Kit name or link from the site</li>
            <li>Photos if you have a fitment concern</li>
          </ul>
        </section>
      </div>

      <p class="mt-10 text-body-sm text-ink-muted">
        Check the <a routerLink="/faq" class="text-brand no-underline hover:text-brand-700">FAQ</a> for quick answers on
        shipping and compatibility.
      </p>
    </div>
  `,
})
export class ContactComponent {
  readonly email = 'hello@bendecal.com';
  readonly emailHref = `mailto:${this.email}`;
}
