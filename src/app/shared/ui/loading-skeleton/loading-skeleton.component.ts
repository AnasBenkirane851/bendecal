import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  template: `
    <div class="grid gap-6" [class]="gridClass()">
      @for (i of items; track i) {
        <div class="card-kit animate-pulse">
          <div class="aspect-[4/3] bg-surface-muted"></div>
          <div class="space-y-3 p-4">
            <div class="h-4 w-2/3 rounded bg-surface-sunken"></div>
            <div class="h-3 w-full rounded bg-surface-muted"></div>
            <div class="h-3 w-1/2 rounded bg-surface-muted"></div>
            <div class="mt-4 flex justify-between">
              <div class="h-6 w-16 rounded bg-surface-sunken"></div>
              <div class="h-8 w-24 rounded bg-surface-sunken"></div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class LoadingSkeletonComponent {
  readonly count = input(6);
  readonly gridClass = input('sm:grid-cols-2 lg:grid-cols-3');

  get items(): number[] {
    return Array.from({ length: this.count() }, (_, i) => i);
  }
}
