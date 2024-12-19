import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { da, id } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Blogs } from 'src/app/models/Blogs';
import { Comments } from 'src/app/models/Comments';
import { ImageDto } from 'src/app/models/dto/ImageDto';
import { UserDto } from 'src/app/models/dto/UserDto';
import { BlogStorageService } from 'src/app/services/blog-storage.service';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { LikeService } from 'src/app/services/like.service';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogs: Blogs;
  imgs: ImageDto[] = [];
  comments: Comments[] = [];
  cmtForm: FormGroup;
  reportForm: FormGroup;
  selectedImage: ImageDto | null = null;
  liked: boolean = false;
  bookmarked: boolean = false;
  idDelete: any;
  spinner: boolean = true
  userDto: any;
  constructor(
    private blogService: BlogService,
    private imgService: ImageService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private likeService: LikeService,
    private bookMarkedSer: BlogStorageService,
    private reportService: ReportService,
    private toast: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.spinner = false;
    }, 750)
    this.checkBM();
    this.checkLike();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const activeID = params.get("id");
      if (activeID) {
        this.blogService.findById(activeID).subscribe(data => {
          this.blogs = data;
          this.cmtForm.patchValue({
            blog: this.blogs
          })

          this.reportForm.patchValue({
            blog: this.blogs
          })
          this.userService.getUser().subscribe(data => {
            this.cmtForm.patchValue({user : data});
            this.reportForm.patchValue({user : data});
            this.userDto = data;
            this.likeService.CheckLiked(this.blogs.id, data.id).subscribe(data => {
              this.liked = data;
            });
  
            this.bookMarkedSer.CheckBookMarked(this.blogs.id, data.id).subscribe(data => {
              this.bookmarked = data;
            });
          })
        });

        this.imgService.findByIdImgBlog(activeID).subscribe((images: any) => {
          this.imgs = images;
        });

        this.commentService.GetCmtById(activeID).subscribe((data: any) => {
          this.comments = data;
        })

      }
    });
    this.cmtForm = new FormGroup({
      content: new FormControl(''),
      date: new FormControl(''),
      blog: new FormControl(''),
      user: new FormControl('')
    })

    this.reportForm = new FormGroup({
      content: new FormControl(''),
      date: new FormControl(''),
      blog: new FormControl(''),
      user: new FormControl('')
    })

  }

  openImage(image: ImageDto): void {
    this.selectedImage = image;
  }

  addNewComment() {
    if (this.cmtForm.invalid) {
      this.toast.error('Vui lòng nhập thông tin')
    } else {
      this.commentService.AddNewComment(this.cmtForm.value).subscribe(data => {
        this.toast.success('Thanks u')
        this.ngOnInit();
      })
    }
  }

  toggleLike(id: number) {
    this.userService.getUser().subscribe(data => {
      this.likeService.ToggleLike(id, data.id).subscribe(data => {

      })
    })
    
  }

  toggleBM(id: number) {
    this.userService.getUser().subscribe(data => {
      this.bookMarkedSer.ToggleBM(id, data.id).subscribe(data => {

      })
    })
  }

  checkLike() {
    this.liked = !this.liked;
  }

  checkBM() {
    this.bookmarked = !this.bookmarked;
  }

  getId(id) {
    this.idDelete = id;
  }

  deleteCmt() {
    this.commentService.deleteCmt(this.idDelete).subscribe(data => {
      this.toast.success('Thanks')
      this.ngOnInit()
    })
  }

  addNewRp() {
    if (this.reportForm.invalid) {
      this.toast.warning('aaaa')
    } else {
      this.reportService.addNewReport(this.reportForm.value).subscribe(
        data => {
          this.toast.success('Báo cáo thành công');
          this.ngOnInit();
        }
      )
    }
  }


}
