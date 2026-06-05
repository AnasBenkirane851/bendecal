import { Component, input, signal } from '@angular/core';
import { resolveAssetUrl } from '../../../core/config/asset-url';

@Component({
  selector: 'app-kit-image',
  standalone: true,
  template: `
    <div
      class="overflow-hidden bg-gradient-to-br from-surface-sunken to-surface-muted"
      [class]="aspectClass()"
    >
      @if (resolvedSrc() && !failed()) {
        <img
          [src]="resolvedSrc()"
          [alt]="alt()"
          class="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          (error)="failed.set(true)"
        />
      } @else if (gradientStyle()) {
        <div class="h-full w-full" [style.background]="gradientStyle()"></div>
      }
    </div>
  `,
})
export class KitImageComponent {
  readonly src = input<string | undefined>('');
  readonly alt = input('');
  readonly aspectClass = input('aspect-[4/3] w-full');
  readonly colorHex = input<string | undefined>();

  readonly failed = signal(false);

  resolvedSrc(): string {
    const path = this.src();
    return path ? resolveAssetUrl(path) : '';
  }

  gradientStyle(): string | undefined {
    const hex = this.colorHex();
    if (!hex) {
      return undefined;
    }
    return `linear-gradient(135deg, ${hex}33 0%, ${hex}88 50%, #18181b22 100%)`;
  }
}
