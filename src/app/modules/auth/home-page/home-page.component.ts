import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/Blogs';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isDropdownVisible = true;

  blogList: Blogs[] = []


  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.GetAll()
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  GetAll() {
    this.blogService.getAllBlog().subscribe((data: any) => {
      this.blogList = data
    })
  }
}
