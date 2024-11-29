import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageDto } from '../models/dto/ImageDto';
import { Observable } from 'rxjs';
import { Images } from '../models/Images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private API_IMG = 'http://localhost:8080/api/'

  constructor(
    private http: HttpClient,
  ) { }

  CreateImg(blogImg: ImageDto): Observable<ImageDto> {
    return this.http.post<ImageDto>(this.API_IMG + 'create-img', blogImg);
  }

  findByIdImgBlog(id: any): Observable<ImageDto> {
    return this.http.get<ImageDto>(this.API_IMG + 'findByIdBlogImg/' + id);
  }
}
