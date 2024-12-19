import { Component, OnInit } from '@angular/core';
import { Reports } from 'src/app/models/Reports';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.css']
})
export class ManageReportComponent implements OnInit {
  reports: Reports[] = [];
  constructor(private reportService: ReportService) { }
  ngOnInit(): void {
    this.reportService.getAllBlogReport().subscribe(data => {
      this.reports = data;
    })
  }

  
}
