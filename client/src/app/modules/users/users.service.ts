import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/shared/models/data.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersUrl = 'users';

  constructor(private http: HttpClient) {}

  viewAllUsers(): Observable<{ data: User[] }> {
    return this.http.get<{ data: User[] }>(this.usersUrl);
  }

  viewSingleUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${id}`);
  }

  changeUserRole({ data, id }): Observable<any> {
    return this.http.patch<any>(`${this.usersUrl}/${id}/change-role`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.usersUrl}/${id}`);
  }
}
