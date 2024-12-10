import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { da, id } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Blogs } from 'src/app/models/Blogs';
import { ImageDto } from 'src/app/models/dto/ImageDto';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogs: Blogs;
  imgs: ImageDto[] = [];
  comments: Comment[] = [];
  cmtForm: FormGroup;
  selectedImage: ImageDto | null = null;
  liked: boolean = false;
  idDelete: any




  userFake = {
    "id": 3,
    "avatar": "https://png.pngtree.com/png-vector/20190719/ourmid/pngtree-no-photo-png-image_1555358.jpg",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "gender": 1,
    "phoneNumber": "1234567890",
    "birthDate": "1990-01-01",
    "address": "123 Main Street",
    "account": {
      "id": 1,
      "accountName": "john_doe",
      "password": "hashed_password1",
      "status": true,
      "roles": [
        {
          "id": 2,
          "roleName": "USER"
        },
        {
          "id": 1,
          "roleName": "ADMIN"
        }
      ]
    }
  }



  constructor(
    private blogService: BlogService,
    private imgService: ImageService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private likeService: LikeService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.checkLike()
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const activeID = params.get("id");
      if (activeID) {
        this.blogService.findById(activeID).subscribe(data => {
          this.blogs = data;
          this.cmtForm.patchValue({
            blog: this.blogs
          })

          this.likeService.CheckLiked(this.blogs.id, this.userFake.id).subscribe(data => {
            this.liked = data;
          });

        });

        this.imgService.findByIdImgBlog(activeID).subscribe((images: any) => {
          this.imgs = images;
        });

        this.commentService.GetCmtById(activeID).subscribe(data => {
          this.comments = data;
        })


      }
    });

    this.cmtForm = new FormGroup({
      content: new FormControl(''),
      date: new FormControl(''),
      blog: new FormControl(''),
      user: new FormControl(this.userFake)
    })


  }

  openImage(image: ImageDto): void {
    this.selectedImage = image;
  }

  addNewComment() {
    console.log(this.cmtForm.value)
    if (this.cmtForm.invalid) {
      this.toast.error('Vui lòng nhập thông tin')
    } else {
      this.commentService.AddNewComment(this.cmtForm.value).subscribe(data => {
        this.toast.success('Thanks u')
      })
    }
  }

  toggleLike(id: number) {
    this.likeService.ToggleLike(id, this.userFake.id).subscribe(data => {

    })
  }

  checkLike() {
    this.liked = !this.liked;
  }

  getId(id){
    this.idDelete = id;
  }

  deleteCmt(){
    this.commentService.deleteCmt(this.idDelete).subscribe(data => {
      this.toast.success('Thanks')
      this.ngOnInit()
    })
  }

}
