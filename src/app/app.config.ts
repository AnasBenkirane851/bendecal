import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { FITMENT_REPOSITORY } from './data/repositories/fitment.repository';
import { HttpFitmentRepository } from './data/repositories/fitment.repository.http';
import { KIT_REPOSITORY } from './data/repositories/kit.repository';
import { HttpKitRepository } from './data/repositories/kit.repository.http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: KIT_REPOSITORY, useClass: HttpKitRepository },
    { provide: FITMENT_REPOSITORY, useClass: HttpFitmentRepository },
  ],
};
