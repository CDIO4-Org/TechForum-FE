import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDistanceToNow } from 'date-fns';
import { Blogs } from 'src/app/models/Blogs';
import { BlogService } from 'src/app/services/blog.service';
import { vi } from 'date-fns/locale';
import { ImageService } from 'src/app/services/image.service';
import { ImageDto } from 'src/app/models/dto/ImageDto';
import { Images } from 'src/app/models/Images';
import { LikeService } from 'src/app/services/like.service';
import { ViewService } from 'src/app/services/view.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
  blogList: Blogs[] = [];
  items: any[] = [];
  searchs: FormGroup;
  blogLikeCount: any = 0;

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
    private likeService: LikeService,
    private viewSer: ViewService,
    private cmtService: CommentService
  ) {
    this.searchs = new FormGroup({
      title: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.GetAll();
    this.setupSearchListener();
  }

  async GetAll() {
    try {
      // Lấy dữ liệu từ blogService
      const data: any[] = await this.blogService.getAllBlog().toPromise();

      // Duyệt qua mỗi bài viết và thêm tổng số lượt like
      const updatedBlogList = await Promise.all(data.map(async (blog) => {
        // Tính toán thời gian tương đối
        const relativeTime = this.getRelativeTime(blog.beginDate);

        // Lấy tổng lượt like cho từng bài viết
        const likeCount = await this.likeService.viewLike(blog.id).toPromise();
        const viewCount = await this.viewSer.countView(blog.id).toPromise();
        const cmtCount = await this.cmtService.countCmt(blog.id).toPromise();

        // Trả về một object mới có thông tin likeCount và relativeTime
        return {
          ...blog,
          relativeTime,
          likeCount, // Thêm số lượt like vào mỗi bài viết
          viewCount,
          cmtCount 
        };
      }));

      // Cập nhật danh sách blog với thông tin mới
      this.blogList = updatedBlogList;

      // Nếu cần, có thể lưu vào items hoặc thực hiện các công việc khác
      this.items = updatedBlogList;

    } catch (error) {
      console.error('Error fetching data', error);
    }
  }



  getRelativeTime(date: string): string {
    return formatDistanceToNow(new Date(date), { locale: vi });
  }

  getWithName(title: string) {
    this.blogService.findByTitle(title).subscribe((data: Blogs[]) => {
      this.blogList = data;
    });
  }

  setupSearchListener() {
    this.searchs.get('title')?.valueChanges.subscribe((title: string) => {
      this.getWithName(title);
    });
  }

  toogleView(id){
    this.viewSer.toogleView(id, this.userFake.id).subscribe(data =>{

    })
  }

}