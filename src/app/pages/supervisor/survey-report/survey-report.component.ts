import { Component, OnInit } from '@angular/core';
import { SurveyReportService } from '../../../core/service/surveyReport.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit {
  surveyReports: any[] = [];

  constructor(private surveyReportService: SurveyReportService) {}

  ngOnInit(): void {
    this.surveyReportService.getSurveyReport().subscribe(
      (data) => {
        this.surveyReports = data;
        console.log('Survey Report:', this.surveyReports);
      },
      (error) => {
        console.error('Error fetching survey report:', error);
      }
    );
  }
}
