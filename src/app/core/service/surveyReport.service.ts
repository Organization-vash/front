import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyReportService {
  private baseUrl = 'http://localhost:8080/api/v1/survey-report';

  constructor(private http: HttpClient) {}

  getSurveyReport(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
