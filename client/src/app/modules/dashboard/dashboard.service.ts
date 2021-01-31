import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUser } from './dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  registerUrl = 'auth/login';

  constructor(private http: HttpClient) {}

  register(data: object): Observable<object> {
    return this.http.post(this.registerUrl, data);
  }
}
