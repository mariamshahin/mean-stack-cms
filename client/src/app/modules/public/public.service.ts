import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'app/shared/models/data.model';

@Injectable({ providedIn: 'root' })
export class PublicService {
  private postsApi = 'posts';

  constructor(private http: HttpClient) {}

  viewAllPosts(): Observable<{ data: Post[] }> {
    return this.http.get<{ data: Post[] }>(this.postsApi);
  }

  viewSinglePost(id: number): Observable<{ data: Post }> {
    return this.http.get<{ data: Post }>(`${this.postsApi}/${id}`);
  }
}
