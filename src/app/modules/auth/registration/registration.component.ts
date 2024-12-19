import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  spinner: boolean = true
  showpass: boolean = false
  registerForm: FormGroup
  constructor(private accountService: AccountService, private router: Router, private toast: ToastrService) {
    this.registerForm = new FormGroup({
      accountName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      rePassword: new FormControl()
    })
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.spinner = false
    },750)
  }

  viewpassword() {
    this.showpass = !this.showpass;
  }

  registerAccount(){
    if(this.registerForm.get('rePassword')?.value == this.registerForm.get('password')?.value){
      this.accountService.register(this.registerForm.value).subscribe(next=>{
        this.toast.success('Cập nhật thông tin cá nhân thành công');
        this.router.navigateByUrl("/auth/login");
      })
    }else{
      this.toast.error('Vui lòng nhập lại mật khẩu phải trùng khớp');
    }
  }
}
