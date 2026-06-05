import { Component } from '@angular/core';

@Component({
  selector: 'app-design-system',
  standalone: true,
  templateUrl: './design-system.component.html',
})
export class DesignSystemComponent {
  readonly brandSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
}
