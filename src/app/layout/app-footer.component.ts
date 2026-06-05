import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="mt-auto border-t border-line bg-surface-inverse text-ink-inverse">
      <div class="app-container py-10">
        <div class="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p class="font-display text-2xl font-bold uppercase tracking-wider">Bendecal</p>
            <p class="mt-2 max-w-prose text-body-sm text-ink-muted">
              Premium motorcycle decal kits — designed to fit, built to last.
            </p>
          </div>
          <nav class="flex flex-wrap gap-x-6 gap-y-2 text-body-sm" aria-label="Footer">
            <a routerLink="/kits" class="text-ink-muted no-underline hover:text-ink-inverse">Kits</a>
            <a routerLink="/how-it-works" class="text-ink-muted no-underline hover:text-ink-inverse">How it works</a>
            <a routerLink="/faq" class="text-ink-muted no-underline hover:text-ink-inverse">FAQ</a>
            <a routerLink="/contact" class="text-ink-muted no-underline hover:text-ink-inverse">Contact</a>
          </nav>
        </div>
        <p class="mt-8 border-t border-line/20 pt-6 text-caption text-ink-muted">
          &copy; {{ year }} Bendecal. All rights reserved.
        </p>
      </div>
    </footer>
  `,
})
export class AppFooterComponent {
  readonly year = new Date().getFullYear();
}
