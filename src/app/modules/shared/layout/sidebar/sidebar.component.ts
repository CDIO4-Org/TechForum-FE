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
  sizeCate: any

  cateList: Categories[] = [];
  
  constructor(
    private cateService: CategoryService
  ) { }

  ngOnInit(): void {
    this.GetCate();
    this.setupSidebar();
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
      this.sizeCate = this.cateList.length;
    })
  }

  setupSidebar(): boolean{
    const roleData = localStorage.getItem('Role_Key');
    const roles = JSON.parse(roleData);
    for(let role of roles){
      if(role.authority === 'ADMIN'){
        return true
      }
    }
    return false;
  }
}
