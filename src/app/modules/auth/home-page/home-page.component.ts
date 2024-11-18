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

  
  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }


}
