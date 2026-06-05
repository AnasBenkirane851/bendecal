import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface FitmentRepository {
  getMakes(): Observable<string[]>;
  getModelsForMake(make: string): Observable<string[]>;
  getYearsForMakeModel(make: string, model: string): Observable<number[]>;
}

export const FITMENT_REPOSITORY = new InjectionToken<FitmentRepository>('FITMENT_REPOSITORY');
