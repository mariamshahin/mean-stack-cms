import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register, Login } from './dashboard.model';
import { User } from 'app/shared/models/data.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private registerApi = 'auth/register';
  private loginApi = 'auth/login';

  constructor(private http: HttpClient) {}

  register(data: Register): Observable<User> {
    return this.http.post<User>(this.registerApi, data);
  }

  login(data: Login): Observable<{ data: User }> {
    return this.http.post<{ data: User }>(this.loginApi, data);
  }

  logout(): void {
    window.localStorage.clear();
  }
}
