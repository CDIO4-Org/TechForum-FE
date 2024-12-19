import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogStorage } from '../models/BlogStorage';

@Injectable({
  providedIn: 'root'
})
export class BlogStorageService {
  private API_BOOKMARKED = 'http://localhost:8080/api/storage'

  constructor(
    private http: HttpClient

  ) { }

  ToggleBM(blogId: any, userId: any): Observable<string> {
    return this.http.post(this.API_BOOKMARKED + '/?blogId=' + blogId + '&userId=' + userId, userId, { responseType: 'text' });
  }

  CheckBookMarked(blogId: any, userId: any): Observable<boolean> {
    return this.http.get<boolean>(this.API_BOOKMARKED + '/checkExist' + '?blogId=' + blogId + '&userId=' + userId)
  }

  getBookmarked(userId: any): Observable<BlogStorage[]> {
    return this.http.get<BlogStorage[]>(this.API_BOOKMARKED + '/getAll?userId=' + userId)
  }
}
