import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Likes } from '../models/Likes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private API_LIKE = 'http://localhost:8080/api/like';  

  constructor(
    private http: HttpClient

  ) { }

  ToggleLike(blogId: any, userId: any): Observable<Likes> {
    return this.http.post<Likes>(this.API_LIKE + '/?blogId=' + blogId + '&userId=' + userId , userId)
  }

  toggleLike(blogId: any, userId: any): Observable<Likes> {
    const params = new HttpParams()
      .set('blogId', blogId)
      .set('userId', userId);

    return this.http.post<Likes>(this.API_LIKE + '/', { params });
  }
}
