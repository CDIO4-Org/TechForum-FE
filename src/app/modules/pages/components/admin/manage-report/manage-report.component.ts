import { Component, OnInit } from '@angular/core';
import { da } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Blogs } from 'src/app/models/Blogs';
import { Reports } from 'src/app/models/Reports';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.css']
})
export class ManageReportComponent implements OnInit {
  reports: Reports[] = [];
  blog: Blogs = null;
  report: Reports = null;
  currentPage: number = 0; 
  totalPages: number = 0; 
  pageSize: number = 5; 
  sort: string[] = ['reportDate', 'asc'];
  constructor(private reportService: ReportService, private toast: ToastrService) { }
  ngOnInit(): void {
    this.loadReports(this.currentPage);
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadReports(page);
    }
  }

  loadReports(page: number){
    this.reportService.getAllBlogReport(page, this.pageSize, this.sort).subscribe(data => {
      this.reports = data.content;
      this.currentPage = data.number;
      this.totalPages = data.totalPages;
    })
  }

  updateReport(id: number){
    this.reports.forEach(data =>{
      if(data.id === id){
        this.report = data;
      }
    })
    if(this.report.status === true){
      this.toast.error("Báo cáo này đã được duyệt");
    }else {
      this.reportService.updateReport(this.report).subscribe(next => {
      this.toast.success('Duyệt thành công');
      this.ngOnInit();
      })
    } 
  }
}
