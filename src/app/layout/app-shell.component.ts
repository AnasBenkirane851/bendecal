import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from './app-footer.component';
import { AppHeaderComponent } from './app-header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, RouterOutlet],
  template: `
    <div class="flex min-h-screen flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppShellComponent {}
