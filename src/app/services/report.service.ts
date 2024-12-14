import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reports } from '../models/Reports';

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
}
