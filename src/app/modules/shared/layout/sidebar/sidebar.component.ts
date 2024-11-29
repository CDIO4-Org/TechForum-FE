import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/Categories';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isDropdownVisible = true;
  isDropdownVisible2 = true;
  isDropdownVisible3 = true;

  cateList: Categories[] = [];
  
  constructor(
    private cateService: CategoryService
  ) { }

  ngOnInit(): void {
    this.GetCate();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleDropdown2() {
    this.isDropdownVisible2 = !this.isDropdownVisible2;
  }

  toggleDropdown3() {
    this.isDropdownVisible3 = !this.isDropdownVisible3;
  }

  GetCate(){
    this.cateService.findAll().subscribe((data: any) =>{
      this.cateList = data;
    })
  }
}
