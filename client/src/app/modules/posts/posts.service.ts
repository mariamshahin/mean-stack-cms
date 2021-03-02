import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'app/shared/models/data.model';
import { PostData } from './posts.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private postsApi = 'posts';

  constructor(private http: HttpClient) {}

  viewAllPosts(): Observable<{ data: Post[] }> {
    return this.http.get<{ data: Post[] }>(this.postsApi);
  }

  viewSinglePost(id: number): Observable<{ data: Post }> {
    return this.http.get<{ data: Post }>(`${this.postsApi}/${id}`);
  }

  deletePost(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.postsApi}/${id}`);
  }

  createPost(data: PostData): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.image);
    return this.http.post<{ message: string }>(this.postsApi, formData);
  }

  updatePost({ data, id }): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.image);
    return this.http.put<{ message: string }>(
      `${this.postsApi}/${id}`,
      formData
    );
  }
}
