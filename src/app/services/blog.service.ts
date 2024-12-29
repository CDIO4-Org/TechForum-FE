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
    return this.http.get<Blogs[]>(this.API_BLOG)
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

  getBlogApprove(page: number, pageSize: number): Observable<Blogs[]> {
    const blogApprove = `${this.API_BLOG}getAllBlogs?page=${page}&size=${pageSize}`;
    return this.http.get<Blogs[]>(blogApprove)
  }

  getNoneActive(page: number, pageSize: number): Observable<Blogs[]> {
    const blogApprove = `${this.API_BLOG}nonActivedBlogs?page=${page}&size=${pageSize}`;
    return this.http.get<Blogs[]>(blogApprove)
  }

  getActive(page: number, pageSize: number): Observable<Blogs[]> {
    const blogApprove = `${this.API_BLOG}activedBlogs?page=${page}&size=${pageSize}`;
    return this.http.get<Blogs[]>(blogApprove)
  }

  updateApprove(id: any, blog: Blogs): Observable<string> {
    return this.http.put(this.API_BLOG + 'updateBlog?id=' + id, blog, {responseType: 'text'})
  }

  findByCateId(id: any): Observable<Blogs[]>{
    return this.http.get<Blogs[]>(this.API_BLOG + 'findByCategoryId/' + id)
  }

  getBlogByUser(id: number): Observable<Blogs[]>{
    return this.http.get<Blogs[]>(this.API_BLOG + 'findByUserId/'+ id)
  }


}
