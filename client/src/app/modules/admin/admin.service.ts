import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, Password } from './admin.model';
import { User } from 'app/shared/models/data.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private updateProfileApi = 'auth/profile';
  private updateImageApi = 'auth/profile-image';
  private changePasswordApi = 'auth/change-password';

  constructor(private http: HttpClient) {}

  updateProfile(data: Profile): Observable<{ data?: User; message: string }> {
    return this.http.put<{ data: User; message: string }>(
      this.updateProfileApi,
      data
    );
  }

  updateImage(data): Observable<{ data?: User; message: string }> {
    console.log(data);
    const formData = new FormData();
    formData.append('image', data.image);
    return this.http.patch<{ data: User; message: string }>(
      this.updateImageApi,
      formData
    );
  }

  changePassword(data: Password): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(this.changePasswordApi, data);
  }
}
