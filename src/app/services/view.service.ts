import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private API_VIEW = 'http://localhost:8080/api/views/'

  constructor(
    private http: HttpClient

  ) { }

  toogleView(blogId: any, userId: any): Observable<String>{
    return this.http.post(this.API_VIEW + '?blogId=' + blogId + '&userId=' + userId, userId, {
      responseType: 'text'
    });
  }

  countView(blogId: any): Observable<Number>{
    return this.http.get<Number>(this.API_VIEW + 'countView?blogId='+ blogId)
  }
}
