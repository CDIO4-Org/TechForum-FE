import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Blogs } from 'src/app/models/Blogs';
import { ImageDto } from 'src/app/models/dto/ImageDto';
import { BlogService } from 'src/app/services/blog.service';
import { ImageService } from 'src/app/services/image.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-blog-approve',
  templateUrl: './blog-approve.component.html',
  styleUrls: ['./blog-approve.component.css']
})
export class BlogApproveComponent implements OnInit {
  blogs: Blogs[] = []
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 8;
  pages: boolean = false;
  pageRange: number[] = [];
  noRecord: boolean;
  blogUpdate: any;
  blogUpdateForm: FormGroup;
  imgs: ImageDto[] = [];



  constructor(
    private blogApproveService: BlogService,
    private imgService: ImageService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.loadBlogs(this.currentPage);

    this.blogUpdateForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      beginDate: new FormControl(''),
      content: new FormControl(''),
      status: new FormControl(''),
      user: new FormControl(''),
      category: new FormControl(''),
    })

    
  }


  loadBlogs(page: number): void {
    this.blogApproveService.getBlogApprove(page, this.pageSize).subscribe(
      (response: any) => {
        this.blogs = response.content;
        this.currentPage = response.pageable.pageNumber;
        this.totalPages = response.totalPages;
        this.pages = this.totalPages > 1;
        this.countPageCanShow()
      },
      (error) => console.error('Error loading blogs:', error)
    );

  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadBlogs(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadBlogs(this.currentPage);
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadBlogs(this.currentPage);

    }
  }

  countPageCanShow() {
    const rangeStart = Math.max(0, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages - 1, this.currentPage + 2);
    this.pageRange = Array(rangeEnd - rangeStart + 1).fill(0).map((x, i) => i + rangeStart);
  }

  getIdBlog(item) {
    this.blogUpdate = item
    this.blogUpdateForm.patchValue({
      id: this.blogUpdate.id,
      title: this.blogUpdate.title,
      beginDate: this.blogUpdate.beginDate,
      content: this.blogUpdate.content,
      status: true,
      user: this.blogUpdate.user,
      category: this.blogUpdate.category,
    })
    this.imgService.findByIdImgBlog(this.blogUpdate.id).subscribe((images: any) => {
      this.imgs = images;
    });
  }

  updateStatus() {
    console.log(this.blogUpdateForm.value)
    this.blogApproveService.updateApprove(this.blogUpdateForm.value.id, this.blogUpdateForm.value).subscribe(data => {
      this.toastr.success('Blog đã được duyệt', 'Thành công');
      this.ngOnInit();
    })
  }


  FormatStatusColor(status: number): string {
    if (status == 0) {
      return 'rgb(55,125,246)';
    } else if (status == 1) {
      return 'green';
    } else {
      return 'red';
    }
  }

  FormatStatus(status) {
    if (status == 0) {
      return "Chưa duyệt"
    } else if (status == 1) {
      return " Đã duyệt"
    } else {
      return "o Hủy bỏ"
    }
  }
}
