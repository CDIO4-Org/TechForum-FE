import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { UserDto } from '../models/dto/UserDto';
import { Users } from '../models/Users';
import { UserEditDto } from '../models/dto/UserEditDto';
import { FormGroup } from '@angular/forms';

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

  updateUser(id: number, userDto: FormGroup): Observable<UserEditDto>{
    console.log("service: " + userDto);
    const formData = new FormData();
    Object.keys(userDto.controls).forEach(key => {
      const control = userDto.get(key);
      if(control?.value instanceof File){
        console.log(control?.value);
        formData.append(key, control.value);
      }else {
        console.log(control?.value)
        formData.append(key, control?.value);
      }
    })
    // return this.httpClient.put<UserEditDto>(this.URL+"/profile/update/" + id, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   }
    // });
    return this.httpClient.put<UserEditDto>(this.URL+"/profile/update/" + id, formData);
  }
}
