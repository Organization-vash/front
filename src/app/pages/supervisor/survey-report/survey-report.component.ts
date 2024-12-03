import { Component, OnInit } from '@angular/core';
import { SurveyReportService } from '../../../core/service/surveyReport.service';
import { nextQueueService} from '../../../core/service/nextQueue.service';
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

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
  isLoading = false;
  reportData: any[] = [];
  constructor(private surveyReportService: SurveyReportService, private http: HttpClient, private nextQueueService: nextQueueService) {}

  ngOnInit(): void {
    this.loadSurveyReport();
    this.loadPieChart();
    this.loadBarChart();
    this.loadReportData();
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

  loadReportData(): void {
    this.isLoading = true;

    this.surveyReportService.getReportData().subscribe({
      next: (data: any[]) => {
        this.reportData = data; // Asignar los datos recibidos
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar el reporte:', error);
        alert('Ocurrió un error al cargar el reporte.');
        this.isLoading = false;
      },
    });
  }

  downloadReport(): void {
    this.isLoading = true;

    this.surveyReportService.downloadReport().subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;

        // Nombre del archivo basado en la fecha y hora actual
        const timestamp = new Date().toLocaleString().replace(/[: ]/g, '_');
        a.download = `Reporte_${timestamp}.xlsx`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al descargar el reporte:', error);
        alert('Ocurrió un error al descargar el reporte.');
        this.isLoading = false;
      },
    });
  }
}
