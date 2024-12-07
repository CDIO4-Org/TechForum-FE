import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { JwtService } from './jwt.service';
import { AccountRole } from '../models/AccountRole';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private accountService: AccountService, private jwtService: JwtService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = this.jwtService.verifyToken();
    if(!logged) {
      console.log(logged);
      console.log("bạn cần phải đăng nhập");
      this.router.navigateByUrl("/auth/login")
      return false;
    }else{
      // const accountRole: AccountRole[] = [];
      return true;
    }
  }
}
