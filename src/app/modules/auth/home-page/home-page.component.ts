import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blogs } from 'src/app/models/Blogs';
import { Categories } from 'src/app/models/Categories';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { JwtService } from 'src/app/services/jwt.service';

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
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.GetAll()
    this.GetCategory();
    this.Load();
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

  Load(){
    if(this.jwtService.verifyToken()){
      this.router.navigateByUrl("/pages/components/home-main");
    }
  }
}
