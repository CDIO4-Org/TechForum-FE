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

  ToggleLike(blogId: any, userId: any): Observable<string> {
    return this.http.post(this.API_LIKE + '/?blogId=' + blogId + '&userId=' + userId, userId, { responseType: 'text' });
  }


  toggleLike(blogId: any, userId: any): Observable<Likes> {
    const params = new HttpParams()
      .set('blogId', blogId)
      .set('userId', userId);

    return this.http.post<Likes>(this.API_LIKE + '/', { params });
  }

  CheckLiked(blogId: any, userId: any): Observable<boolean> {
    return this.http.get<boolean>(this.API_LIKE + '/liked' + '?blogId=' + blogId + '&userId=' + userId)
  }

  viewLike(blogId: any): Observable<Number>{
    return this.http.get<Number>(this.API_LIKE + '/countLike' + '?blogId=' + blogId)
  }

  getLiked(userId: any): Observable<Likes[]>{
    return this.http.get<Likes[]>(this.API_LIKE + '/getAll?userId=' + userId)
  }
}
