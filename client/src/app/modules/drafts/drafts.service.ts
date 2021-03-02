import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'app/shared/models/data.model';
import { DraftData } from './drafts.model';

@Injectable({ providedIn: 'root' })
export class DraftsService {
  private draftsApi = 'drafts';

  constructor(private http: HttpClient) {}

  viewAllDrafts(): Observable<{ data: Post[] }> {
    return this.http.get<{ data: Post[] }>(this.draftsApi);
  }

  viewSingleDraft(id: number): Observable<{ data: Post }> {
    return this.http.get<{ data: Post }>(`${this.draftsApi}/${id}`);
  }

  deleteDraft(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.draftsApi}/${id}`);
  }

  createDraft(data: DraftData): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.image);
    return this.http.post<{ message: string }>(this.draftsApi, formData);
  }

  updateDraft({ data, id }): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.image);
    return this.http.put<{ message: string }>(
      `${this.draftsApi}/${id}`,
      formData
    );
  }
}
