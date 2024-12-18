import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { UserDto } from '../models/dto/UserDto';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = "http://localhost:8080/api";
  private httpOptions: any;
  constructor(private httpClient: HttpClient, private jwtService: JwtService) {
    this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          }),
          'Access-Control-Allow-Origin': 'http://localhost:4200/',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        };
   }
  
  getUser(): Observable<UserDto>{
    const userName = this.jwtService.getName();
    return this.httpClient.get<UserDto>(this.URL+"/profile/" + userName);
  }
}
