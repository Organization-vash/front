
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { SurveyReportService } from '../../../core/service/surveyReport.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import html2canvas from "html2canvas";
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  standalone: true,
  imports: [
    NgxChartsModule,
    CommonModule,
  ],
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit, AfterViewInit  {
  surveyReports: any[] = [];
  barChartData: any[] = [];
  pieChartData: any[] = [];
  colorScheme = 'cool';

  constructor(private surveyReportService: SurveyReportService) {
  }

  ngOnInit(): void {
    this.surveyReportService.getSurveyReport().subscribe(
      (data) => {
        this.surveyReports = data;
        console.log('Survey Report:', this.surveyReports);
        this.generateChartData();
      },
      (error) => {
        console.error('Error fetching survey report:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    // Garantizar que los gráficos estén renderizados antes de capturarlos
    setTimeout(() => {
      this.checkGraphRenderState();
    }, 1500); // Ajusta el tiempo si es necesario
  }

  checkGraphRenderState(): void {
    const barChartElement = document.querySelector('ngx-charts-bar-vertical');
    const pieChartElement = document.querySelector('ngx-charts-pie-chart');

    if (!barChartElement || !pieChartElement) {
      console.error('Gráficos no renderizados correctamente');
    } else {
      console.log('Gráficos listos para capturar');
    }
  }

  generateChartData(): void {
    const totalSurveys = this.surveyReports.reduce((sum, report) => sum + report.quantity, 0);

    this.pieChartData = this.surveyReports.map((report) => ({
      name: report.adviserUsername,
      value: ((report.quantity / totalSurveys) * 100).toFixed(2),
    }));

    this.barChartData = this.surveyReports.map((report) => ({
      name: report.adviserUsername,
      value: report.averageValue,
    }));
  }

  async exportToExcel(): Promise<void> {
    const workbook = new ExcelJS.Workbook();

    // Crear la hoja para los datos
    const worksheet = workbook.addWorksheet('Reporte de Atenciones');
    worksheet.columns = [
      { header: 'Usuario', key: 'adviserUsername', width: 20 },
      { header: 'Cantidad', key: 'quantity', width: 10 },
      { header: 'Promedio', key: 'averageValue', width: 15 },
      { header: 'Fecha', key: 'consultDate', width: 15 },
    ];
    this.surveyReports.forEach((report) => worksheet.addRow(report));

    // Esperar a que los gráficos estén renderizados
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Crear la hoja para gráficos
    const chartWorksheet = workbook.addWorksheet('Gráficos');
    const barChartElement = document.querySelector('ngx-charts-bar-vertical');
    const pieChartElement = document.querySelector('ngx-charts-pie-chart');

    // Capturar el gráfico de barras
    if (barChartElement) {
      const barCanvas = await html2canvas(barChartElement as HTMLElement);
      const barImage = barCanvas.toDataURL('image/png');
      const barImageId = workbook.addImage({
        base64: barImage,
        extension: 'png',
      });
      chartWorksheet.addImage(barImageId, { tl: { col: 0, row: 0 }, ext: { width: 500, height: 300 } });
    }

    // Capturar el gráfico circular
    if (pieChartElement) {
      const pieCanvas = await html2canvas(pieChartElement as HTMLElement);
      const pieImage = pieCanvas.toDataURL('image/png');
      const pieImageId = workbook.addImage({
        base64: pieImage,
        extension: 'png',
      });
      chartWorksheet.addImage(pieImageId, { tl: { col: 0, row: 20 }, ext: { width: 500, height: 300 } });
    }

    // Guardar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Reporte_Atenciones.xlsx');
  }
}
