import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  errorMessage: any = null;
  constructor(private accountService: AccountService, private jwtService: JwtService, private router: Router, private toast: ToastrService) {
    this.formLogin = new FormGroup({
      accountName: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.spinner = false;
    }, 750)
    this.Load();
  }
  
  validation_messages = {
    accountName:[
      { type: 'required', message: 'Vui lòng nhập tên tài khoản.' }
    ],
    password:[
      { type: 'required', message: 'Vui lòng nhập mật khẩu.' }
    ]
  }

  viewpassword() {
    this.showpass = !this.showpass;
  }

  loginSubmit(){
    if(this.formLogin.valid){
      this.accountService.login(this.formLogin.value).subscribe({
        next: (response)=>{
          if(response?.token != undefined){
            this.jwtService.setToken(response.token);
            this.jwtService.setRoles(response.roles);
            this.jwtService.setName(response.name);
            this.jwtService.setDate(response.createdTime);
            this.router.navigateByUrl("/pages/components/home-main");
          }
        },
        error: (err) => {
          this.errorMessage = 'Đăng nhập không thành công!';
          if (err.error?.message) {
            this.errorMessage = err.error.message;
          }
          console.error('Login error:', err); 
        }
      })
    }
    
  }
  
  Load(){
    if(this.jwtService.verifyToken()){
      this.router.navigateByUrl("/pages/components/home-main");
    }
  }
}
