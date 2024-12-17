import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Blogs } from 'src/app/models/Blogs';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { LikeService } from 'src/app/services/like.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-search-categories',
  templateUrl: './search-categories.component.html',
  styleUrls: ['./search-categories.component.css']
})
export class SearchCategoriesComponent implements OnInit {
  spinner: boolean = true
  blogList: Blogs[] = [];
  items: any[] = [];
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
    private cmtService: CommentService,
    private activatedRoute: ActivatedRoute,
    private cateSer: CategoryService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 750)
    this.GetAll();
  }

  async GetAll() {
    try {
      this.activatedRoute.paramMap.subscribe(async (params: ParamMap) => {
        const activeID = params.get("id");
        // Lấy dữ liệu từ blogService
        const data: any[] = await this.blogService.findByCateId(activeID).toPromise();

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

      })

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

  toogleView(id) {
    this.viewSer.toogleView(id, this.userFake.id).subscribe(data => {

    })
  }

}
