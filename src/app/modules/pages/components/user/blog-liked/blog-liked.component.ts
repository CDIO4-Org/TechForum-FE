import { Component, OnInit } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Likes } from 'src/app/models/Likes';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-blog-liked',
  templateUrl: './blog-liked.component.html',
  styleUrls: ['./blog-liked.component.css']
})
export class BlogLikedComponent implements OnInit {
  likeList: Likes[] = []

  constructor(
    private likeService: LikeService,
    private userService: UserService,
    private viewSer: ViewService,
    private cmtService: CommentService
  ) { }

  ngOnInit(): void {
    this.GetAll();
  }


  async GetAll() {
    try {
      const user: any = await this.userService.getUser().toPromise();
      const data: any = await this.likeService.getLiked(user.id).toPromise();
      console.log(data)

      // Duyệt qua mỗi bài viết và thêm tổng số lượt like
      const updateLike = await Promise.all(data.map(async (like) => {
        // Tính toán thời gian tương đối
        const relativeTime = this.getRelativeTime(like.blog.beginDate);

        // Lấy tổng lượt like cho từng bài viết
        const likeCount = await this.likeService.viewLike(like.blog.id).toPromise();
        const viewCount = await this.viewSer.countView(like.blog.id).toPromise();
        const cmtCount = await this.cmtService.countCmt(like.blog.id).toPromise();

        // Trả về một object mới có thông tin likeCount và relativeTime
        return {
          ...like,
          relativeTime,
          likeCount, // Thêm số lượt like vào mỗi bài viết
          viewCount,
          cmtCount
        };
      }));

      // Cập nhật danh sách blog với thông tin mới
      this.likeList = updateLike;

    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  getRelativeTime(date: string): string {
    return formatDistanceToNow(new Date(date), { locale: vi });
  }

}
