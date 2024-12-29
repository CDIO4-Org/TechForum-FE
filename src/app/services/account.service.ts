import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginForm } from '../models/dto/LoginForm';
import { JwtResponse } from '../models/dto/JwtRespone';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { AccountListDto } from '../models/dto/AccountListDto';
import { AccountEditDto } from '../models/dto/AccountEditDto';
import { catchError } from 'rxjs/operators';


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
    return this.httpClient.post<any>(`${this.URL}/account/register`, account, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Error caught in service:', error);
        throw error;
      })
    );
  }

  login(formLogin: LoginForm): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(this.URL+"/account/login", formLogin).pipe(
      catchError((error) => {
        console.error('Error caught in service:', error);
        throw error;
      })
    );
  }

  logout() {
    this.jwtService.removeDate();
    this.jwtService.removeName();
    this.jwtService.removeRoles();
    this.jwtService.removeToken();
    this.router.navigateByUrl("/auth/login");
  }

  getAccList(page: number, pageSize: number): Observable<AccountListDto[]> {
    const accListUrl = `${this.URL}/admin/getAllAccount?page=${page}&size=${pageSize}`;
    return this.httpClient.get<AccountListDto[]>(accListUrl)
  }

  getListActive(page: number, pageSize: number): Observable<AccountListDto[]> {
    const accListUrl = `${this.URL}/admin/getListStatusActive?page=${page}&size=${pageSize}`;
    return this.httpClient.get<AccountListDto[]>(accListUrl)
  }

  getListNonActive(page: number, pageSize: number): Observable<AccountListDto[]> {
    const accListUrl = `${this.URL}/admin/getListStatusNonActive?page=${page}&size=${pageSize}`;
    return this.httpClient.get<AccountListDto[]>(accListUrl)
  }

  editStatus(id: number, status: AccountEditDto): Observable<AccountEditDto> {
    return this.httpClient.put<AccountEditDto>(this.URL + "/admin/updateSatusAccount/" + id, status)
  }
}

