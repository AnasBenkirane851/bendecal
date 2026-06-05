import { Routes } from '@angular/router';
import { cartNotEmptyGuard } from './core/guards/cart-not-empty.guard';
import { AppShellComponent } from './layout/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'design-system',
        loadComponent: () =>
          import('./features/design-system/design-system.component').then((m) => m.DesignSystemComponent),
      },
      {
        path: 'how-it-works',
        loadComponent: () =>
          import('./features/static/how-it-works.component').then((m) => m.HowItWorksComponent),
      },
      {
        path: 'faq',
        loadComponent: () => import('./features/static/faq.component').then((m) => m.FaqComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/static/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: 'kits',
        loadComponent: () => import('./features/catalog/catalog.component').then((m) => m.CatalogComponent),
      },
      {
        path: 'kits/:slug',
        loadComponent: () => import('./features/kit-detail/kit-detail.component').then((m) => m.KitDetailComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'checkout',
        canActivate: [cartNotEmptyGuard],
        loadComponent: () => import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
      },
      {
        path: 'order/:id',
        loadComponent: () =>
          import('./features/order-confirmation/order-confirmation.component').then((m) => m.OrderConfirmationComponent),
      },
    ],
  },
];
