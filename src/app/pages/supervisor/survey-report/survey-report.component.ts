import { Component, OnInit } from '@angular/core';
import { SurveyReportService } from '../../../core/service/surveyReport.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit {
  surveyReports: any[] = [];
  pieChartSrc: string | undefined;
  barChartSrc: string | undefined;

  constructor(private surveyReportService: SurveyReportService) {}

  ngOnInit(): void {
    this.loadSurveyReport();
    this.loadPieChart();
    this.loadBarChart();
  }

  loadSurveyReport(): void {
    this.surveyReportService.getSurveyReport().subscribe((data) => (this.surveyReports = data));
  }

  loadPieChart(): void {
    this.surveyReportService.getPieChart().subscribe((blob) => {
      this.pieChartSrc = URL.createObjectURL(blob);
    });
  }

  loadBarChart(): void {
    this.surveyReportService.getBarChart().subscribe((blob) => {
      this.barChartSrc = URL.createObjectURL(blob);
    });
  }

  downloadExcel(): void {
    this.surveyReportService.downloadExcelReport().subscribe((response) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SurveyReport.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
