import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDistanceToNow } from 'date-fns';
import { Blogs } from 'src/app/models/Blogs';
import { BlogService } from 'src/app/services/blog.service';
import { vi } from 'date-fns/locale';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
  blogList: Blogs[] = [];
  searchs: FormGroup;

  constructor(
    private blogService: BlogService
  ) {
    this.searchs = new FormGroup({
      title: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.GetAll();
    this.setupSearchListener();
  }

  GetAll() {
    this.blogService.getAllBlog().subscribe((data: any[]) => {
      this.blogList = data.map(blog => ({
        ...blog,
        relativeTime: this.getRelativeTime(blog.beginDate) 
      }));
    });
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
}