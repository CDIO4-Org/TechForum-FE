import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { da } from 'date-fns/locale';
import { UserDto } from 'src/app/models/dto/UserDto';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  previewUrl: string | ArrayBuffer | null = null;
  userForm: FormGroup;
  userDto: UserDto = null;
  constructor(private render: Renderer2, private userService: UserService, private formBuilder: FormBuilder, private toast: ToastrService) {
  }

  ngOnInit(): void {
    const script = this.render.createElement('script');
    script.src = 'assets/js/slide1.js';
    this.render.appendChild(document.body, script);

    this.userService.getUser().subscribe(data =>{
      this.userDto = data;
      this.previewUrl = data.avaUrl;
      this.userForm = this.formBuilder.group({
        avatar: [this.previewUrl],
        firstName: [this.userDto.firstName],
        lastName: [this.userDto.lastName],
        email: [this.userDto.email],
        gender: [this.userDto.gender],
        phoneNumber: [this.userDto.phoneNumber],
        birthDate: [this.userDto.birthDate],
        address: [this.userDto.address]
      })
      console.log("before: " + this.previewUrl);
      console.log("userDto: " + this.userDto);
    })
    
  }


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result; // Cập nhật URL ảnh xem trước
        this.userForm.patchValue({avatar: file});
        console.log("after select: " + this.previewUrl);
      };
      reader.readAsDataURL(file); // Đọc file
    }
  }

  onSubmit(){
    this.userService.updateUser(this.userDto.id, this.userForm).subscribe(next => {
      this.toast.success('Cập nhật thông tin cá nhân thành công');
      this.ngOnInit();
    })
  }
}
