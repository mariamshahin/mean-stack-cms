import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register, Login } from './dashboard.model';
import { User } from 'app/shared/models/data.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private registerUrl = 'auth/register';
  private loginUrl = 'auth/login';

  constructor(private http: HttpClient) {}

  register(data: Register): Observable<User> {
    return this.http.post<User>(this.registerUrl, data);
  }

  login(data: Login): Observable<{ data: User }> {
    return this.http.post<{ data: User }>(this.loginUrl, data);
  }

  logout(): void {
    localStorage.clear();
  }
}
