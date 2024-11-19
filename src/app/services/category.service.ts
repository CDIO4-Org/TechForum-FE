import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_CATE = 'http://localhost:8080/api/getAllCategory';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.API_CATE);
  }
}
