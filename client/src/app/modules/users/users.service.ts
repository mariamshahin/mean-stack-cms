import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserData } from 'app/shared/models/data.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersApi = 'users';

  constructor(private http: HttpClient) {}

  viewAllUsers(): Observable<{ data: User[] }> {
    return this.http.get<{ data: User[] }>(this.usersApi);
  }

  viewSingleUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.usersApi}/${id}`);
  }

  changeUserRole({
    data,
    id,
  }): Observable<{ message: string; data?: UserData }> {
    return this.http.patch<{ message: string; data?: UserData }>(
      `${this.usersApi}/${id}/change-role`,
      data
    );
  }

  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.usersApi}/${id}`);
  }
}
