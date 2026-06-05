import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Kit } from '../../core/models/kit.model';
import { KIT_REPOSITORY } from '../../data/repositories/kit.repository';
import { KitCardComponent } from '../../shared/ui/kit-card/kit-card.component';
import { LoadingSkeletonComponent } from '../../shared/ui/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, KitCardComponent, LoadingSkeletonComponent],
  template: `
    <section class="border-b border-line bg-surface-inverse text-ink-inverse">
      <div class="app-container py-16 md:py-24">
        <p class="text-label-sm uppercase tracking-widest text-brand-400">Motorcycle decal kits</p>
        <h1 class="mt-3 max-w-3xl text-display-md text-ink-inverse md:text-display-lg">
          Transform your ride
        </h1>
        <p class="mt-6 max-w-xl text-body-lg text-ink-muted">
          Premium graphics engineered for your make, model, and year.
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <a routerLink="/kits" class="btn-primary btn-lg no-underline">Browse kits</a>
        </div>
      </div>
    </section>

    <section class="app-container py-14">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="section-title mb-0">Featured kits</h2>
          <p class="mt-2 text-body-md text-ink-secondary">Popular graphics ready to ship.</p>
        </div>
        <a routerLink="/kits" class="link-nav no-underline">View all →</a>
      </div>

      @if (loading()) {
        <app-loading-skeleton [count]="3" gridClass="sm:grid-cols-2 lg:grid-cols-3" />
      } @else {
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (kit of featured(); track kit.id) {
            <app-kit-card [kit]="kit" />
          }
        </div>
      }
    </section>

    <section class="border-t border-line bg-surface py-14">
      <div class="app-container">
        <h2 class="section-title">Why Bendecal</h2>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="card">
            <h3 class="text-heading-md">Precise fitment</h3>
            <p class="mt-2 text-body-sm text-ink-secondary">Filter by make, model, and year before you buy.</p>
          </div>
          <div class="card">
            <h3 class="text-heading-md">Pro-grade vinyl</h3>
            <p class="mt-2 text-body-sm text-ink-secondary">Matte and gloss finishes built for road and track.</p>
          </div>
          <div class="card">
            <h3 class="text-heading-md">Install support</h3>
            <p class="mt-2 text-body-sm text-ink-secondary">Guides and piece counts included with every kit.</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly kitRepo = inject(KIT_REPOSITORY);

  readonly featured = signal<Kit[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.kitRepo.getFeatured(3).subscribe({
      next: (kits) => {
        this.featured.set(kits);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
