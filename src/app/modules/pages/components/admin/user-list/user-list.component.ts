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
  disableForm: FormGroup;
  enableForm: FormGroup;
  idDisabled: number;
  accName: string;
  isLoading = false;
  filterStatus: string = 'all';


  pages: boolean = false;
  pageSize: number = 10;
  currentPage: number = 0;
  totalPages: number = 0;
  noRecord: number;
  pageRange: number[] = [];





  constructor(
    private accService: AccountService
  ) { }

  ngOnInit(): void {

    this.applyFilter(this.currentPage)

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

  applyFilter(page: number): void {
    if (this.filterStatus === 'all') {
      this.accService.getAccList(page, this.pageSize).subscribe(
        (data: any) => {
          this.accList = data.content
          this.currentPage = data.pageable.pageNumber;
          this.totalPages = data.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.accList.length
        },
        (error) => console.error('Error loading account:', error)
      );
    }
    else if (this.filterStatus === 'active') {
      this.accService.getListActive(page, this.pageSize).subscribe(
        (data: any) => {
          this.accList = data.content
          this.currentPage = data.pageable.pageNumber;
          this.totalPages = data.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.accList.length
        },
        (error) => console.error('Error loading account:', error)
      );
    }
    else if (this.filterStatus === 'nonactive') {
      this.accService.getListNonActive(page, this.pageSize).subscribe(
        (data: any) => {
          this.accList = data.content
          this.currentPage = data.pageable.pageNumber;
          this.totalPages = data.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.accList.length
        },
        (error) => console.error('Error loading account:', error)
      );
    }
  }
  onFilterChange(status: string): void {
    this.filterStatus = status;
    this.applyFilter(this.currentPage); // Cập nhật danh sách bài viết hiển thị
  }

  countPageCanShow() {
    const rangeStart = Math.max(0, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages - 1, this.currentPage + 2);
    this.pageRange = Array(rangeEnd - rangeStart + 1).fill(0).map((x, i) => i + rangeStart);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyFilter(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.applyFilter(this.currentPage);
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.applyFilter(this.currentPage);

    }
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
