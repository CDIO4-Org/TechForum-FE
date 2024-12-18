import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { da } from 'date-fns/locale';
import { UserDto } from 'src/app/models/dto/UserDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  previewUrl: string | ArrayBuffer | null = null; // Biến lưu URL ảnh
  userForm: FormGroup;
  userDto: UserDto;
  ava: any;
  constructor(private render: Renderer2, private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const script = this.render.createElement('script');
    script.src = 'assets/js/slide1.js';
    this.render.appendChild(document.body, script);

    this.userService.getUser().subscribe(data =>{
      this.userDto = data;
      this.previewUrl = data.avaUrl;
      this.userForm = this.formBuilder.group({
        firstName: [this.userDto.firstName],
        lastName: [this.userDto.lastName],
        email: [this.userDto.email],
        avatar: [this.userDto.avaUrl],
        gender: [this.userDto.gender],
        address: [this.userDto.address],
        birthdate: [this.userDto.birthDate],
        phoneNumber: [this.userDto.phoneNumber]
      })
      console.log("gender: " + this.userForm.value.gender);
    })

  }


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]; // Lấy file được chọn
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result; // Cập nhật URL ảnh xem trước
      };
      reader.readAsDataURL(file); // Đọc file
    }
  }

  onSubmit(){
    
  }
}
