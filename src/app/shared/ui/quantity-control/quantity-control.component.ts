import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-control',
  standalone: true,
  template: `
    <div class="inline-flex items-center rounded-md border border-line">
      <button
        type="button"
        class="btn-ghost btn-sm rounded-none px-3"
        [disabled]="quantity() <= min()"
        (click)="decrement()"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span class="min-w-[2.5rem] px-2 text-center text-label-md text-ink" aria-live="polite">{{ quantity() }}</span>
      <button
        type="button"
        class="btn-ghost btn-sm rounded-none px-3"
        [disabled]="quantity() >= max()"
        (click)="increment()"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  `,
})
export class QuantityControlComponent {
  readonly quantity = input.required<number>();
  readonly min = input(1);
  readonly max = input(99);

  readonly quantityChange = output<number>();

  decrement(): void {
    if (this.quantity() > this.min()) {
      this.quantityChange.emit(this.quantity() - 1);
    }
  }

  increment(): void {
    if (this.quantity() < this.max()) {
      this.quantityChange.emit(this.quantity() + 1);
    }
  }
}
