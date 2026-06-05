import { computed, Injectable, signal } from '@angular/core';
import { CartLine } from '../models/cart-line.model';
import { Kit } from '../models/kit.model';
import { KitVariant } from '../models/kit-variant.model';

const STORAGE_KEY = 'bendecal.cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly linesSignal = signal<CartLine[]>(this.loadFromStorage());

  readonly lines = this.linesSignal.asReadonly();

  readonly itemCount = computed(() =>
    this.linesSignal().reduce((sum, line) => sum + line.quantity, 0)
  );

  readonly subtotalCents = computed(() =>
    this.linesSignal().reduce((sum, line) => sum + line.priceCents * line.quantity, 0)
  );

  readonly isEmpty = computed(() => this.linesSignal().length === 0);

  addLine(kit: Kit, variant: KitVariant, quantity = 1): void {
    const existing = this.linesSignal().find((l) => l.variantId === variant.id);
    if (existing) {
      this.updateQuantity(variant.id, existing.quantity + quantity);
      return;
    }
    const line: CartLine = {
      variantId: variant.id,
      kitId: kit.id,
      kitSlug: kit.slug,
      kitName: kit.name,
      variantLabel: variant.label,
      sku: variant.sku,
      priceCents: variant.priceCents,
      quantity,
      image: kit.images[0] ?? '',
    };
    this.setLines([...this.linesSignal(), line]);
  }

  updateQuantity(variantId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeLine(variantId);
      return;
    }
    this.setLines(
      this.linesSignal().map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    );
  }

  removeLine(variantId: string): void {
    this.setLines(this.linesSignal().filter((l) => l.variantId !== variantId));
  }

  clear(): void {
    this.setLines([]);
  }

  private setLines(lines: CartLine[]): void {
    this.linesSignal.set(lines);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }

  private loadFromStorage(): CartLine[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as CartLine[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
