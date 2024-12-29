import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { Blogs } from '../../../../../models/Blogs';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { LikeService } from 'src/app/services/like.service';
import { ViewService } from 'src/app/services/view.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-blog-posted',
  templateUrl: './blog-posted.component.html',
  styleUrls: ['./blog-posted.component.css']
})
export class BlogPostedComponent implements OnInit {
  blogPosted: Blogs[] = [];
  userId: number;
  noRecord: number;

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private likeService: LikeService,
    private viewSer: ViewService,
    private cmtService: CommentService
  ) { }

  ngOnInit(): void {
    this.GetAll();
  }


  async GetAll() {
    try {
      // Lấy dữ liệu từ blogService
      const user: any = await this.userService.getUser().toPromise();
      const data: any[] = await this.blogService.getBlogByUser(user.id).toPromise();
      this.userId = user.id;

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
      this.blogPosted = updatedBlogList;

      this.noRecord = data.length

      // Nếu cần, có thể lưu vào items hoặc thực hiện các công việc khác

    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  getRelativeTime(date: string): string {
    return formatDistanceToNow(new Date(date), { locale: vi });
  }

  toogleView(id){
    this.viewSer.toogleView(id, this.userId).subscribe(data =>{

    })
  }

}
