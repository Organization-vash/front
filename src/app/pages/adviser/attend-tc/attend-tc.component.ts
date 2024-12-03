
import { Component, Injectable, OnInit } from '@angular/core';
import { ticketAttendedTcComponent } from './ticket-attend-tc.component';
import { ServiceService } from '../../../core/service/service.service';
import { nextQueueService } from '../../../core/service/nextQueue.service';
import { AddRemoveService } from '../../../core/service/addRemoveService.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe, NgForOf, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-attend-tc',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, NgClass, DatePipe],
  templateUrl: './attend-tc.component.html',
  styleUrl: './attend-tc.component.css',
})

@Injectable({
  providedIn: 'root',
})
export class AttendTcComponent implements OnInit {
  ticketData: any;
  services: any[] = [];
  availableServices: any[] = []; // Lista de servicios disponibles
selectedServices: any[] = []; // Lista de servicios seleccionados

  successful: boolean = false;
  notSuccessful: boolean = false;
  attended: boolean = false;
  notAttended: boolean = false;
  showMessagePopup: boolean = false;
  message: string = '';
  showSurveyPopup: boolean = false;
  timeLeft: number = 1200; // Tiempo total en segundos (20 minutos)
  timeWarning: boolean = false; // Indica si faltan 5 minutos
  timeLimitPassed: boolean = false; // Indica si el tiempo límite fue excedido
  timerInterval: any; // Intervalo del temporizador
  Math = Math; // Exponer Math para usarlo en el template
  attentionId: number | null = null; // Nuevo campo para almacenar el attentionId

  constructor(
    private ticketService: ticketAttendedTcComponent,
    private serviceService: ServiceService,
    private nextQueueService: nextQueueService,
    private addRemoveService: AddRemoveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketService.getTicketData().subscribe((data) => {
      this.ticketData = data;
      this.attentionId = data?.attentionId || null; // Extraer attentionId
      console.log('Datos del ticket:', this.ticketData);

    this.obtenerService();
  });
    this.startTimer();
  }
  private obtenerService(): void {
    this.serviceService.obtenerListaDeServicios().subscribe((services) => {
      // Verifica si el ticketData tiene servicios seleccionados
      this.selectedServices = this.ticketData?.selectedServices || [
        { id: this.ticketData.serviceId, name: this.ticketData.serviceName },
      ];

      // Filtra los servicios disponibles excluyendo los seleccionados
      this.availableServices = services.filter(
        (service) =>
          !this.selectedServices.some((selected) => selected.id === service.id)
      );

      // Debugging: Verifica qué datos están cargando
      console.log('Servicios seleccionados:', this.selectedServices);
      console.log('Servicios disponibles:', this.availableServices);
    });
  }


  addService(service: any): void {
    if (!this.attentionId) {
      console.error('Attention ID no está disponible.');
      return;
    }

    this.addRemoveService.addServiceToAttention(this.attentionId, service.id).subscribe(
      () => {
        console.log('Servicio agregado:', service);
        this.selectedServices.push(service);
        this.availableServices = this.availableServices.filter((s) => s.id !== service.id);
      },
      (error) => {
        console.error('Error al agregar servicio:', error);
      }
    );
  }

  removeService(service: any): void {
    if (!this.attentionId) {
      console.error('Attention ID no está disponible.');
      return;
    }

    this.addRemoveService.removeServiceFromAttention(this.attentionId, service.id).subscribe(
      () => {
        console.log('Servicio eliminado:', service);
        this.availableServices.push(service);
        this.selectedServices = this.selectedServices.filter((s) => s.id !== service.id);
      },
      (error) => {
        console.error('Error al eliminar servicio:', error);
      }
    );
  }


  markAsSuccessful() {
    if (!this.successful) {
      this.nextQueueService.markAsSuccessful().subscribe(() => {
        this.successful = true;
        this.notSuccessful = false;
        console.log('Ticket marcado como Satisfecho');
      });
    }
  }

  markAsNotSuccessful() {
    if (!this.notSuccessful) {
      this.nextQueueService.markAsNotSuccessful().subscribe(() => {
        this.notSuccessful = true;
        this.successful = false;
        console.log('Ticket marcado como No Satisfecho');
      });
    }
  }
  markAsAttend() {
    if (!this.attended) {
      // Marca como "Atendido" solo si no estaba marcado
      this.nextQueueService.markAsAttend().subscribe(() => {
        this.attended = true;
        this.notAttended = false; // Desmarca "No Atendido" si estaba marcado
        console.log('Ticket marcado como Atendido');
      });
    }
  }

  markAsNotAttend() {
    if (!this.notAttended) {
      // Marca como "No Atendido" solo si no estaba marcado
      this.nextQueueService.markAsNotAttend().subscribe(() => {
        this.notAttended = true;
        this.attended = false; // Desmarca "Atendido" si estaba marcado
        console.log('Ticket marcado como No Atendido');
      });
    }
  }
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      // Notificar cuando queden 5 minutos
      if (this.timeLeft === 300 && !this.timeWarning) {
        this.timeWarning = true;
        alert("Quedan 5 minutos para finalizar el tiempo máximo.");
      }

      // Notificar si se supera el promedio de tiempo de atención (10 minutos)
      if (this.timeLeft === 600) { // 10 minutos pasados
        alert("Promedio de tiempo superado.");
      }

      // Notificar cuando se pase del tiempo límite (0 segundos)
      if (this.timeLeft <= 0 && !this.timeLimitPassed) {
        this.timeLimitPassed = true;
        this.notifyTimeLimitPassed();
      } else if (this.timeLimitPassed && this.timeLeft % 120 === 0) {
        // Notificación repetitiva cada 2 minutos después del límite
        this.notifyTimeLimitPassed();
      }
    }, 1000); // Intervalo de 1 segundo
  }


  notifyTimeLimitPassed(): void {
    alert("Límite de tiempo pasado. Por favor, finalice la atención.");
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  ngOnDestroy(): void {
    // Detener el temporizador al destruir el componente
    this.stopTimer();
  }


  finalizarAtencion() {
    // Verificar si no ha pasado al menos un minuto
    if (this.timeLeft > 1140) { // Tiempo inicial es 1200s (20min). 1200 - 1140 = 60s (1min)
      alert("No se puede terminar la atención antes de 1 minuto.");
      return;
    }

    const ticketId = this.ticketData?.ticketCodeId;
    if (this.ticketData && ticketId) {
      this.nextQueueService.finalizarAtencion(ticketId).subscribe(
        (response) => {
          this.message = response.message;
          this.showMessagePopup = true;

          this.stopTimer();

          setTimeout(() => {
            this.showMessagePopup = false;
            this.router.navigate(['/nqc']);
          }, 3000);
        },
        (error) => {
          this.message = 'Error al finalizar la atención';
          this.showMessagePopup = true;

          setTimeout(() => {
            this.showMessagePopup = false;
          }, 3000);
        }
      );
    } else {
      console.error('No se encontró el ID del ticket para finalizar la atención.');
    }
  }

  openSurveyPopup(): void {
    this.showSurveyPopup = true;
  }
// Cierra la ventana emergente
  closeSurveyPopup(): void {
    this.showSurveyPopup = false;
  }
  selectedRating: number = 0; // Calificación seleccionada
// Establecer la calificación seleccionada
  setRating(star: number): void {
    this.selectedRating = star;
    // Enviar la calificación al backend
    const surveyPayload = { value: this.selectedRating };
    this.nextQueueService.registerSurvey(surveyPayload).subscribe(
      (response: any) => {
        console.log('Encuesta registrada con éxito:', response.message);
        this.message = response.message;
        this.showMessagePopup = true;
        setTimeout(() => {
          this.showMessagePopup = false;
          this.showSurveyPopup = false; // Cierra la ventana emergente
        }, 3000);
      },
      (error) => {
        console.error('Error al registrar la encuesta:', error);
        this.message = 'Error al registrar la encuesta';
        this.showMessagePopup = true;
        setTimeout(() => {
          this.showMessagePopup = false;
        }, 3000);
      }
    );
  }
}
