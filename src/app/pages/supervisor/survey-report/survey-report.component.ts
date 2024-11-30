import { Component, OnInit } from '@angular/core';
import { SurveyReportService } from '../../../core/service/surveyReport.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
export class SurveyReportComponent implements OnInit {
  surveyReports: any[] = [];
  barChartData: any[] = [];
  pieChartData: any[] = [];
  colorScheme = 'cool';

  constructor(private surveyReportService: SurveyReportService) {}

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

  async exportToPDF(): Promise<void> {
    const doc = new jsPDF('p', 'mm', 'a4'); // Crear documento PDF
    const margin = 10;
    let y = margin;

    // Título del documento
    doc.setFontSize(14);
    doc.text('Reporte de Encuestas', doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
    y += 10;

    // Capturar tabla
    const tableElement = document.querySelector('.table');
    if (tableElement) {
      const tableCanvas = await html2canvas(tableElement as HTMLElement, { scale: 2 });
      const tableImageData = tableCanvas.toDataURL('image/png');
      doc.addImage(tableImageData, 'PNG', margin, y, doc.internal.pageSize.getWidth() - margin * 2, 50); // Ajusta el tamaño
      y += 60;
    }

    // Capturar gráfico de barras
    const barChartElement = document.querySelector('ngx-charts-bar-vertical');
    if (barChartElement) {
      const barCanvas = await html2canvas(barChartElement as HTMLElement, { scale: 2 });
      const barImageData = barCanvas.toDataURL('image/png');
      doc.text('Gráfico de barras: Promedio de calificación vs Asesor', margin, y);
      y += 10;
      doc.addImage(barImageData, 'PNG', margin, y, doc.internal.pageSize.getWidth() - margin * 2, 60); // Ajusta el tamaño
      y += 70;
    }

    // Capturar gráfico circular
    const pieChartElement = document.querySelector('ngx-charts-pie-chart');
    if (pieChartElement) {
      const pieCanvas = await html2canvas(pieChartElement as HTMLElement, { scale: 2 });
      const pieImageData = pieCanvas.toDataURL('image/png');
      doc.text('Gráfico Circular: Número de encuestas vs Asesor', margin, y);
      y += 10;
      doc.addImage(pieImageData, 'PNG', margin, y, doc.internal.pageSize.getWidth() - margin * 2, 60); // Ajusta el tamaño
    }

    // Guardar el PDF
    doc.save('Survey_Report.pdf');
  }

}
