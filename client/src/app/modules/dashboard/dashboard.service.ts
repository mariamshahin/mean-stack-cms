import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUser } from './dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  //registerUrl = 'https://mean-cms-api.herokuapp.com/auth/login';
  registerUrl = 'http://localhost:3000/auth/login';
  
  constructor(private http: HttpClient) {}

  register(data): Observable<object> {
    console.log(data)
    return this.http.post(this.registerUrl, data);
  }
}
