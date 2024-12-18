import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Categories } from 'src/app/models/Categories';
import { finalize } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ImageDto } from 'src/app/models/dto/ImageDto';
import { Blogs } from 'src/app/models/Blogs';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { da } from 'date-fns/locale';
import { UserDto } from 'src/app/models/dto/UserDto';
import { Users } from 'src/app/models/Users';


declare var bootstrap: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  cateList: Categories[] = [];
  blogForm: FormGroup;
  today: any = Date.now();
  selectedImage: any = null;
  defaultImageUrl = 'https://png.pngtree.com/png-vector/20190719/ourmid/pngtree-no-photo-png-image_1555358.jpg';
  userDto: UserDto;

  constructor(
    private accountService: AccountService,
    private renderer: Renderer2,
    private blogService: BlogService,
    private cateService: CategoryService,
    private imgService: ImageService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private elementRef: ElementRef,
    private userService: UserService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getUserByName();
    this.blogForm = new FormGroup({
      title: new FormControl(''),
      beginDate: new FormControl(''),
      content: new FormControl(''),
      status: new FormControl(''),
      user: new FormControl(''),
      category: new FormControl(''),
    })
  }


  getCategories() {
    this.cateService.findAll().subscribe(next => {
      this.cateList = next;
    });
  }

  create() {
    if (this.selectedImage && this.selectedImage.length > 0) {
      for (let i = 0; i < this.selectedImage.length; i++) {
        const nameImg = this.getCurrentDateTime() + this.selectedImage[i].name;
        const fileRef = this.storage.ref(nameImg);
        this.storage.upload(nameImg, this.selectedImage[i]).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.callApiAndSaveUrl(url);
            });
          })
        ).subscribe();
      }
    } else {
      this.callApiAndSaveUrl(this.defaultImageUrl);
    }

    if (this.blogForm.invalid) {
      return;
    }

    const formData = this.blogForm.value;
    this.blogService.createBlog(formData).subscribe({
      next: (data: Blogs) => {
        this.toastr.success('Blog created successfully!', 'Success');
        const modalElement = document.getElementById('exampleModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        setTimeout(() => {
          const backdrops = document.querySelectorAll('.modal-backdrop');
          backdrops.forEach((backdrop) => backdrop.remove());
        }, 200); 
        modal.dispose();
      },
      error: (err) => {
        this.toastr.error('Failed to create blog!', 'Error');
      }
    });
  }

  callApiAndSaveUrl(url: string) {
    const blogImg: ImageDto = {
      nameImg: url,
      blog_id: null,
    };
    this.imgService.CreateImg(blogImg).subscribe(() => {
    });
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }



  showPreview(event: any) {
    this.selectedImage = event.target.files;
  }

  getUserByName(){
    this.userService.getUser().subscribe(data => {
      this.blogForm.patchValue({user: data});
    })
  }

  onLogout(){
    this.accountService.logout();
  }

}
