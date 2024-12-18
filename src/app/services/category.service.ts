import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_CATE = 'http://localhost:8080/api/';
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.API_CATE + 'getAllCategory');
  }

  deleteCategories(id: any): Observable<string> {
    return this.http.delete(this.API_CATE + 'deleteCategory?id=' + id, { responseType: 'text' });
  };

  addnewCate(cate: Categories): Observable<Categories> {
    return this.http.post<Categories>(this.API_CATE + 'addNewCategory', cate);
  }
}

