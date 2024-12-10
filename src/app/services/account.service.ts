import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginForm } from '../models/dto/LoginForm';
import { JwtResponse } from '../models/dto/JwtRespone';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private URL = "http://localhost:8080/api/auth";
  
  private httpOptions: any;
  constructor(private httpClient: HttpClient, private jwtService: JwtService, private router: Router) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  register(account: any): Observable<any>{
    return this.httpClient.post<any>(this.URL + "/account/register", account, this.httpOptions);
  }

  login(formLogin: LoginForm): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(this.URL+"/account/login", formLogin);
  }

  logout(){
    this.jwtService.removeDate();
    this.jwtService.removeName();
    this.jwtService.removeRoles();
    this.jwtService.removeToken();
    this.router.navigateByUrl("/auth/login");
  }
}
