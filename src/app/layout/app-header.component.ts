import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../core/services/cart.service';

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Kits', path: '/kits' },
  { label: 'How it works', path: '/how-it-works' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="sticky top-0 z-header">
      <div class="border-b border-line bg-surface-inverse text-ink-inverse">
        <div class="app-container py-2 text-center text-caption text-ink-muted md:text-left">
          Premium decal kits — precise fitment — install guides included
        </div>
      </div>

      <header class="relative border-b border-line bg-surface/95 backdrop-blur">
      <div class="app-container flex h-16 items-center justify-between gap-4">
        <a routerLink="/" class="shrink-0 font-display text-2xl font-bold uppercase tracking-wider text-ink no-underline">
          Bendecal
        </a>

        <nav class="hidden items-center gap-6 lg:flex" aria-label="Main">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              class="link-nav"
              routerLinkActive="link-nav-active"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <a routerLink="/kits" class="btn-primary btn-sm hidden no-underline sm:inline-flex">Find your kit</a>

          <a
            routerLink="/cart"
            class="btn-ghost btn-sm relative gap-1.5 no-underline"
            [attr.aria-label]="'Cart, ' + cart.itemCount() + ' items'"
          >
            <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l3.383 12.834a1.125 1.125 0 001.087.835h9.126a1.125 1.125 0 001.087-.835l1.44-5.472A1.125 1.125 0 0018.37 9H6.862M7.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
            <span class="hidden text-label-md md:inline">Cart</span>
            @if (cart.itemCount() > 0) {
              <span
                class="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground md:static md:ml-0 md:h-5 md:min-w-5 md:text-[11px]"
              >
                {{ cart.itemCount() }}
              </span>
            }
          </a>

          <button
            type="button"
            class="btn-ghost btn-sm inline-flex lg:hidden"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-nav"
            (click)="toggleMenu()"
          >
            <span class="sr-only">{{ menuOpen() ? 'Close menu' : 'Open menu' }}</span>
            @if (menuOpen()) {
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            } @else {
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            }
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <div class="fixed inset-0 top-0 z-overlay bg-ink/40 lg:hidden" aria-hidden="true" (click)="closeMenu()"></div>
        <nav
          id="mobile-nav"
          class="absolute left-0 right-0 top-full z-modal border-b border-line bg-surface px-4 py-4 shadow-lg lg:hidden"
          aria-label="Mobile"
        >
          <div class="flex flex-col gap-1">
            @for (item of navItems; track item.path) {
              <a
                [routerLink]="item.path"
                class="rounded-md px-3 py-2.5 font-medium text-ink-secondary no-underline hover:bg-surface-muted hover:text-ink"
                routerLinkActive="bg-brand-50 text-brand"
                [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                (click)="closeMenu()"
              >
                {{ item.label }}
              </a>
            }
          </div>
          <a routerLink="/kits" class="btn-primary btn-lg mt-4 block w-full text-center no-underline" (click)="closeMenu()">
            Find your kit
          </a>
        </nav>
      }
      </header>
    </div>
  `,
})
export class AppHeaderComponent {
  readonly cart = inject(CartService);
  readonly navItems = NAV_ITEMS;
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
