import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogs } from '../models/Blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private API_BLOG = 'http://localhost:8080/api/blog/'

  constructor(
    private http: HttpClient
  ) { }

  getAllBlog(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(this.API_BLOG + 'activedBlogs')
  }

  createBlog(blog: Blogs): Observable<Blogs> {
    return this.http.post<Blogs>(this.API_BLOG + 'addNewBlog', blog);
  }

  findById(id: any): Observable<Blogs> {
    return this.http.get<Blogs>(this.API_BLOG + 'getByid/' + id);
  }

  findByTitle(title: String): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(this.API_BLOG + 'findByTitle' + '?title=' + title)
  }


}
