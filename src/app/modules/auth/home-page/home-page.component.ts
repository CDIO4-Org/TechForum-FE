import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/Blogs';
import { Categories } from 'src/app/models/Categories';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isDropdownVisible = true;

  blogList: Blogs[] = []
  cateList: Categories[] = []


  constructor(
    private blogService: BlogService,
    private cateService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.GetAll()
    this.GetCategory();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  GetAll() {
    this.blogService.getAllBlog().subscribe((data: any) => {
      this.blogList = data
    })
  }

  GetCategory() {
    this.cateService.findAll().subscribe((data: any) =>{
      this.cateList = data
    })
  }
}
