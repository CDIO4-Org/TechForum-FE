import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageDto } from '../models/dto/ImageDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private API_IMG = 'http://localhost:8080/api/create-img'

  constructor(
    private http: HttpClient,
  ) { }

  CreateImg(blogImg: ImageDto): Observable<ImageDto> {
    return this.http.post<ImageDto>(this.API_IMG, blogImg);
  }
}
