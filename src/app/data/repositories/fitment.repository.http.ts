import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_BASE_URL } from '../../core/tokens/api-url.token';
import { FitmentRepository } from './fitment.repository';

@Injectable()
export class HttpFitmentRepository implements FitmentRepository {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getMakes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBaseUrl}/fitment/makes`).pipe(catchError(() => of([])));
  }

  getModelsForMake(make: string): Observable<string[]> {
    const params = new HttpParams().set('make', make);
    return this.http
      .get<string[]>(`${this.apiBaseUrl}/fitment/models`, { params })
      .pipe(catchError(() => of([])));
  }

  getYearsForMakeModel(make: string, model: string): Observable<number[]> {
    const params = new HttpParams().set('make', make).set('model', model);
    return this.http
      .get<number[]>(`${this.apiBaseUrl}/fitment/years`, { params })
      .pipe(catchError(() => of([])));
  }
}
