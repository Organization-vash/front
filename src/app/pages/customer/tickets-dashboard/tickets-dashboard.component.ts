import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { TicketNotificacionService } from '../../../core/service/ticket-notificacion.service'; // Cambia el servicio aquí

@Component({
  selector: 'app-tickets-dashboard',
  standalone: true,
  imports: [CommonModule], // Agregar CommonModule aquí
  templateUrl: './tickets-dashboard.component.html',
  styleUrls: ['./tickets-dashboard.component.css'],
})
export class TicketsDashboardComponent implements OnInit {
  attendingTickets: { code: string; module: string }[] = [];
  currentTicket: { code: string } | null = null;
  isBlinking = false;

  constructor(private ticketNotificacionService: TicketNotificacionService) {}

  ngOnInit(): void {
    this.loadAttendingTickets();
    this.loadCurrentTicket();
  }

  loadAttendingTickets(): void {
    this.ticketNotificacionService.getAttendingTickets().subscribe((tickets) => {
      this.attendingTickets = tickets;
    });
  }

  loadCurrentTicket(): void {
    this.ticketNotificacionService.getCurrentTicket().subscribe((ticket) => {
      this.currentTicket = ticket;
      this.triggerBlinking();
    });
  }

  triggerBlinking(): void {
    this.isBlinking = true;
    setTimeout(() => (this.isBlinking = false), 1500); // Parpadea 3 veces
  }
}
