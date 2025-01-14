import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ModuleService, Module } from '../../../core/service/module.service';
import { nextQueueService } from '../../../core/service/nextQueue.service';
import { Router } from '@angular/router';
import { ticketAttendedTcComponent } from '../attend-tc/ticket-attend-tc.component';
import { TicketHistory } from '../../../shared/models/ticket-history.model';
import { MatIconModule } from '@angular/material/icon';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-next-queue',
  templateUrl: './next-queue.component.html',
  styleUrls: ['./next-queue.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class NextQueueComponent implements OnInit, OnDestroy {
  moduleId: number;
  userId: string; // Almacena el ID del usuario
  userName: string; // Almacena el nombre del usuario
  moduleStatus: string | undefined;
  mostrarPopup: boolean = false;
  showAcceptPopup: boolean = false;
  showRejectPopup: boolean = false;
  todayTickets: TicketHistory[] = [];
  showHistory = false;
  private intervalId: any;
  private subscription: Subscription;

  ticket = {
    ticketCodeId: '',
    ticketCode: '',
    serviceName: '',
    customerDocNumber: '',
    customerFullName: '',
  };

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private nextQueueService: nextQueueService,
    private ticketAttendTc: ticketAttendedTcComponent
  ) {}

  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.userId = loggedUser.userId || '';
    this.userName = loggedUser.name || '';
    this.moduleId = loggedUser.moduleId;
    this.fetchModuleStatus(this.moduleId); // Cargar el estado del módulo
    this.fetchTransferredTickets();
    this.intervalId = setInterval(() => {
      this.fetchTransferredTickets();
    }, 30000);
  }

  ngOnDestroy(): void {
    // Limpiar intervalo cuando el componente se destruya
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchTransferredTickets(): void {
    this.subscription = this.nextQueueService.getDerivate().subscribe(
      (response) => {
        console.log('Tickets transferidos:', response);
        this.ticket = {
          ticketCodeId: response.ticketCodeId,
          ticketCode: response.ticketCode,
          serviceName: response.serviceName,
          customerDocNumber: response.customerDocNumber,
          customerFullName: response.customerFullName,
        };
        localStorage.setItem('ticketData', JSON.stringify(this.ticket));
        this.mostrarPopup = true;
      },
      (error) => {
        console.error('Error al obtener los tickets transferidos:', error);
      }
    );
  }

  fetchModuleStatus(moduleId: number) {
    this.moduleService.obtenerModuloPorId(moduleId).subscribe(
      (module: Module) => {
        this.moduleStatus = module.moduleStatus;
      },
      (error: any) => {
        console.error('Error fetching module status:', error);
        this.moduleStatus = undefined;
      }
    );
  }

  changeStatus(newStatus: string) {
    const requestPayload = {
      id: this.moduleId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      moduleStatus: newStatus,
      userId: this.userId, // Agregar UserID
      userName: this.userName, // Agregar nombre del usuario
    };

    // Validación del estado RECESS
    if (newStatus === 'RECESS') {
      const now = new Date();
      const hour = now.getHours();
      if (hour < 12 || hour >= 15) {
        alert(
          'No puedes activar el estado de RECESS fuera del rango permitido (12:00 a 15:00).'
        );
        return;
      }
    }

    // Confirmación para INACTIVE
    if (newStatus === 'INACTIVE') {
      const confirmInactive = window.confirm(
        '¿Está seguro de que desea desactivar el módulo?'
      );
      if (!confirmInactive) {
        return;
      }
    }

    // Actualización del estado
    this.moduleService.actualizarModulo(requestPayload).subscribe(
      (response: any) => {
        console.log('Respuesta del backend:', response);
        // Aquí puedes actualizar el estado en el frontend con los datos que devuelve el backend
        this.moduleStatus = response.status;
        this.userName = response.userName; // Asegurar que se actualiza el nombre del usuario en la vista
        this.userId = response.userId; // Asegurar que se actualiza el UserID en la vista
      },
      (error: any) => {
        console.error('Error updating module status:', error);
      }
    );
  }

  mostrarModal() {
    this.nextQueueService.getNextTicketInQueue(this.moduleId).subscribe(
      (response) => {
        this.ticket = {
          ticketCodeId: response.ticketCodeId,
          ticketCode: response.ticketCode,
          serviceName: response.serviceName,
          customerDocNumber: response.customerDocNumber,
          customerFullName: response.customerFullName,
        };
        localStorage.setItem('ticketData', JSON.stringify(this.ticket));
        this.mostrarPopup = true;
      },
      (error: any) => {
        console.error('Error fetching next ticket:', error);
      }
    );
  }

  aceptarTicket() {
    this.nextQueueService.acceptTicket(this.moduleId).subscribe(
      (response) => {
        this.mostrarPopup = false;
        this.showAcceptPopup = true;
        setTimeout(() => {
          this.showAcceptPopup = false;
        }, 3000);
        console.log('Ticket aceptado');

        // Agregar attentionId al ticket
        this.ticketAttendTc.setTicketData({
          ...this.ticket, // Mantén los datos actuales del ticket
          attentionId: response.attentionId, // Añade el attentionId de la respuesta
        });

        this.router.navigate(['/attention']);
      },
      (error) => {
        console.error('Error al aceptar el ticket:', error);
      }
    );
  }


  rechazarTicket() {
    this.nextQueueService.rejectTicket().subscribe(() => {
      this.mostrarPopup = false;
      this.showRejectPopup = true;
      setTimeout(() => {
        this.showRejectPopup = false;
      }, 3000);
      console.log('Ticket rechazado');
    });
  }

  loadTodayHistory(): void{
    if(!this.moduleId){
      console.error('El módulo no está definido');
      return;
    }

    this.nextQueueService.getTodayTickets(this.moduleId).subscribe({
      next: (tickets) => {
        this.todayTickets = tickets;
        this.showHistory = true;
      },
      error: (err) => {
        console.error('Error al obtener los tickets de hoy', err);
      },
    });
  }

  closeHistory(): void {
    this.showHistory = false;
  }
}
