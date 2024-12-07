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
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token)
  }
  public getToken(): string{
    return localStorage.getItem(TOKEN_KEY);
  }
  public removeToken(){
    localStorage.removeItem(TOKEN_KEY);
  }
  public setName(name: string){
    localStorage.removeItem(NAME_KEY);
    localStorage.setItem(NAME_KEY, name);
  }
  public getName():string{
    return localStorage.getItem(NAME_KEY);
  }
  public removeName(){
    localStorage.removeItem(NAME_KEY);
  }
  public setRoles(roles: string[]){
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }
  public getRoles():string[]{
    this.roles=[];
    if(localStorage.getItem(TOKEN_KEY)){
      JSON.parse(localStorage.getItem(ROLE_KEY)).array.forEach(element => {
        this.roles.push(element.authority);
      });
    }
    return this.roles;
  }
  public removeRoles(){
    localStorage.removeItem(ROLE_KEY);
  }
  public setDate(date: any){
    localStorage.removeItem('Date');
    localStorage.setItem(DATE, date);
  }
  public getDate():any{
    return localStorage.getItem(DATE);
  }
  public removeDate(){
    localStorage.removeItem(DATE);
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


}
