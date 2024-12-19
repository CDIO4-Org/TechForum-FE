import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/models/Account';
import { AccountListDto } from 'src/app/models/dto/AccountListDto';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  accList: AccountListDto[] = [];
  page: number = 0;
  pageSize: number = 10;
  disableForm: FormGroup;
  enableForm: FormGroup;
  idDisabled: number;
  accName: string;
  isLoading = false;

  pages: boolean = false;



  constructor(
    private accService: AccountService
  ) { }

  ngOnInit(): void {
    this.accService.getAccList(this.page, this.pageSize).subscribe((data: any) => {
      this.accList = data.content

    })

    this.disableForm = new FormGroup({
      id: new FormControl(''),
      status: new FormControl(true),
      accountName: new FormControl('')
    })

    this.enableForm = new FormGroup({
      id: new FormControl(''),
      status: new FormControl(false),
      accountName: new FormControl('')
    })
  }

  disable(id, acc) {
    this.idDisabled = id;
    this.accName = acc
    this.disableForm.patchValue({
      id: this.idDisabled,
      accountName: this.accName
    })
  }

  enable(id, acc) {
    this.idDisabled = id;
    this.accName = acc
    this.enableForm.patchValue({
      id: this.idDisabled,
      accountName: this.accName
    })
  }

  updateStatusDisable() {
    this.isLoading = true;
    this.accService.editStatus(this.idDisabled, this.disableForm.value).subscribe(data => {
      this.isLoading = false;
      this.ngOnInit();
    })
  }

  updateStatusEnable() {
    this.isLoading = true;
    this.accService.editStatus(this.idDisabled, this.enableForm.value).subscribe(data => {
      this.isLoading = false;
      this.ngOnInit();
    })
  }

  FormatStatusColor(status) {
    if (status == true) {
      return 'red';
    } else if (status == false) {
      return 'green';
    } else {
      return 'red';
    }
  }

  FormatStatus(status) {
    if (status == true) {
      return "Đã vô hiệu hoá"
    } else if (status == false) {
      return "Đang kích hoạt"
    } else {
      return "o Hủy bỏ"
    }
  }

}
