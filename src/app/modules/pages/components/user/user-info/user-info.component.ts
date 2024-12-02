import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  previewUrl: string | ArrayBuffer | null = null; // Biến lưu URL ảnh


  constructor(
    private render: Renderer2,
  ) { }

  ngOnInit(): void {
    const script = this.render.createElement('script');
    script.src = 'assets/js/slide1.js';
    this.render.appendChild(document.body, script);
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

}
