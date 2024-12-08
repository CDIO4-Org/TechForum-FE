import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private API_COMMENT = 'http://localhost:8080/api/comment/'

  constructor(
    private http: HttpClient
  ) { }

  AddNewComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.API_COMMENT + 'addNewComment', comment)
  }

  GetCmtById(id: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.API_COMMENT + 'findAllByIdBlog' + '?id=' + id)
  }

  countCmt(blogId: any): Observable<Number> {
    return this.http.get<Number>(this.API_COMMENT + 'countComment?blogId=' + blogId)
  }

  deleteCmt(id: any): Observable<string> {
    return this.http.delete(this.API_COMMENT + 'deleteComment?id=' + id, { responseType: 'text' });
  }
  
}
