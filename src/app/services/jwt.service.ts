import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_key';
const ROLE_KEY = 'Role_Key';
const DATE = 'Date'
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private roles: Array<string> = [];
  constructor() { }
  public setToken(token: string){
    localStorage.removeItem('Token_Key');
    localStorage.setItem(TOKEN_KEY, token)
  }
  public getToken(): string{
    return localStorage.getItem(TOKEN_KEY);
  }
  public removeToken(){
    localStorage.removeItem('Token_Key');
  }
  public setName(name: string){
    localStorage.removeItem('Name_key');
    localStorage.setItem(NAME_KEY, name);
  }
  public getName():string{
    return localStorage.getItem(NAME_KEY);
  }
  public removeName(){
    localStorage.removeItem('Name_key');
  }
  public setRoles(roles: string[]){
    localStorage.removeItem('Role_Key');
    localStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }
  // public getRoles():string[]{
  //   // this.roles=[];
  //   // if(localStorage.getItem(TOKEN_KEY)){
  //   //   JSON.parse(localStorage.getItem(ROLE_KEY)).array.forEach(element => {
  //   //     this.roles.push(element.authority);
  //   //   });
  //   // }
  //   // return this.roles;
  //   this.roles = [];
  //   const rolesData = localStorage.getItem('Role_Key');
  //   console.log("role data from localStorage: " + rolesData);
  //   if (rolesData) {
  //     try {
  //       const parsedData = JSON.parse(rolesData);
  //       console.log('Parsed data:', parsedData); // Kiểm tra dữ liệu đã được parse
  //       if (Array.isArray(parsedData.array)) {
  //         parsedData.array.forEach((element: any) => {
  //           if (element && element.authority) {
  //             this.roles.push(element.authority);
  //           }
  //         });
  //         console.log('Updated roles:', this.roles); // Kiểm tra sau khi cập nhật roles
  //       } else {
  //         console.error('Dữ liệu không đúng định dạng array');
  //       }
  //     } catch (error) {
  //       console.error('Error parsing roles data:', error);
  //     }
    
  //     console.log('roles: ', this.roles);
  //     return this.roles;
  //   } else {
  //     console.log('Không tìm thấy dữ liệu trong localStorage');
  //     return [];
  //   }
  // }
  
  public removeRoles(){
    localStorage.removeItem('Role_Key');
  }
  public setDate(date: any){
    localStorage.removeItem('Date');
    localStorage.setItem(DATE, date);
  }
  public getDate():any{
    return localStorage.getItem(DATE);
  }
  public removeDate(){
    localStorage.removeItem('Date');
  }
  verifyToken(): any{
    let result = this.getToken() == null ? false : true;
    console.log(result);
    const date = new Date();
    const createdTime = this.getDate();
    if(createdTime != null){
      const created = new Date(createdTime);
      date.setDate(created.getDate() + 1);
      const currentTime = new Date();
      if (date < currentTime) {
        result = false;
        this.removeToken();
        this.removeRoles();
        this.removeName();
        this.removeDate();
      } else {
        console.log('token con hieu luc');
      }
    } else {
      result = false;
    }
    return result;
  }

  public generateHeader(): HttpHeaders {
    const tokenStr = 'Bearer ' + this.getToken();
    return new HttpHeaders().set('Authorization', tokenStr);
  }

}
