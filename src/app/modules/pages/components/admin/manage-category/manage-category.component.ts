import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categories } from 'src/app/models/Categories';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  cateList: Categories[] = [];
  cateId: any;
  cateForm: FormGroup;

  constructor(
    private cateSer: CategoryService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.cateSer.findAll().subscribe(data => {
      this.cateList = data
    })

    this.cateForm = new FormGroup({
      name: new FormControl(''),
    })
  }

  getId(id) {
    this.cateId = id
  }

  deleteCate() {
    this.cateSer.deleteCategories(this.cateId).subscribe(data => {
      this.ngOnInit();
    })
  }

  addNewCate() {
    if (this.cateForm.invalid) {
      this.toast.warning('aaaa')
    } else {
      this.cateSer.addnewCate(this.cateForm.value).subscribe(
        data => {
          this.toast.success('thanh cong')
          this.ngOnInit();
        }
      )
    }
  }

}
