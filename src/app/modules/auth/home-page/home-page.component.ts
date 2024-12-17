import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Blogs } from 'src/app/models/Blogs';
import { Categories } from 'src/app/models/Categories';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LikeService } from 'src/app/services/like.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isDropdownVisible = true;
  spinner: boolean = true
  blogList: Blogs[] = [];
  items: any[] = [];
  searchs: FormGroup;
  blogLikeCount: any = 0;
  cateList: Categories[] = []


  constructor(
    private blogService: BlogService,
    private cateService: CategoryService,
    private jwtService: JwtService,
    private router: Router,
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
    setTimeout(() => {
      this.spinner = false;
    }, 750)
    this.GetAll()
    this.GetCategory();
    this.Load();
    this.setupSearchListener();

  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
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

  GetCategory() {
    this.cateService.findAll().subscribe((data: any) => {
      this.cateList = data
    })
  }

  Load() {
    if (this.jwtService.verifyToken()) {
      this.router.navigateByUrl("/pages/components/home-main");
    }
  }
}
