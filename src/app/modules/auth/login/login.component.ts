import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  spinner: boolean = true
  showpass: boolean = false;
  formLogin: FormGroup;

  constructor(private accountService: AccountService, private jwtService: JwtService, private router: Router) {
    this.formLogin = new FormGroup({
      accountName: new FormControl(),
      password: new FormControl()
    })
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.spinner = false;
    }, 750)
  }
  

  viewpassword() {
    this.showpass = !this.showpass;
  }

  loginSubmit(){
    this.accountService.login(this.formLogin.value).subscribe(next=>{
      if(next.token != undefined){
        this.jwtService.setToken(next.token);
        this.jwtService.setRoles(next.roles);
        this.jwtService.setName(next.name);
        this.jwtService.setDate(next.createdTime);
        this.router.navigateByUrl("/pages/components/home-main");
      }
    })
  }

}
