import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  errorMessage: any = null;
  constructor(private accountService: AccountService, private router: Router, private toast: ToastrService) {
    this.registerForm = new FormGroup({
      accountName: new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern("^[a-z0-9]+$")]),
      email: new FormControl('',[Validators.required, Validators.pattern("^[^\\s@]+@gmail\\.com$")]),
      password: new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[\\S]+$")]),
      rePassword: new FormControl('',[Validators.required, ,Validators.minLength(8)])
    }, [this.validateRePassword]);
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.spinner = false
    },750)
  }
  validation_messages = {
    accountName:[
      { type: 'required', message: 'Vui lòng nhập tên tài khoản.' },
      { type: 'pattern', message: 'Tên tài khoản chứa chữ thường và số.' }
    ],
    email: [
      { type: 'required', message: 'Vui lòng nhập email.' },
      { type: 'pattern', message: 'Vui lòng nhập đúng định dạng.' }
    ],
    password:[
      { type: 'required', message: 'Vui lòng nhập mật khẩu.' },
      { type: 'pattern', message: 'Mật khẩu phải đúng định dạng (vd: Abc@123).' }
    ], 
    rePassword:[
      { type: 'required', message: 'Vui lòng nhập lại mật khẩu.' },
      {type: 'passwordsMismatch', message: "Phải trùng với mật khẩu đã nhập"}
    ] 
  }

  viewpassword() {
    this.showpass = !this.showpass;
  }

  validateRePassword(form: FormGroup): ValidationErrors | null{
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password !== rePassword) {
      return { passwordsMismatch: true}; 
    }
    return null;
  }


  registerAccount() {
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: () => {
          this.toast.success('Đăng ký tài khoản thành công');
          this.router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          if (err.error instanceof Object && err.error?.message) {
            this.errorMessage = err.error.message;
          } else if (typeof err.error === 'string') {
            this.errorMessage = err.error; 
          }
        }
      });
    } else {
      this.toast.error('Vui lòng kiểm tra lại thông tin đăng ký');
    }
  }
}
