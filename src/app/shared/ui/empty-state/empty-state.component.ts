import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center rounded-lg border border-dashed border-line bg-surface px-6 py-16 text-center">
      <p class="font-display text-xl uppercase tracking-wide text-ink">{{ title() }}</p>
      @if (message()) {
        <p class="mt-2 max-w-md text-body-md text-ink-secondary">{{ message() }}</p>
      }
      @if (actionLabel() && actionLink()) {
        <a [routerLink]="actionLink()!" class="btn-primary btn-sm mt-6 no-underline">{{ actionLabel() }}</a>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input<string>();
  readonly actionLabel = input<string>();
  readonly actionLink = input<string>();
}
