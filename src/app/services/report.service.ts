import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reports } from '../models/Reports';
import { Blogs } from '../models/Blogs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private API_REPORT = 'http://localhost:8080/api/'

  constructor(
    private http: HttpClient

  ) { }

  addNewReport(report: Reports): Observable<Reports>{
    return this.http.post<Reports>(this.API_REPORT + 'addNewReports', report)
  }

  getAllBlogReport(page: number, size: number, sort: string[]):Observable<any>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort.join(','));
    return this.http.get<any>(this.API_REPORT + 'getPageReport', {params});
  }

  updateReport(report: Reports):Observable<any>{
    return this.http.put<any>(this.API_REPORT + "updateReport/" + report.id, report);
  }
  
}
