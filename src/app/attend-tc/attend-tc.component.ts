import {Component, Injectable, OnInit} from '@angular/core';
import {ticketAttendedTcComponent} from "./ticket-attend-tc.component";
import {NgForOf, NgIf} from "@angular/common";
import {ServiceService} from "../service/service.service";
import { nextQueueService } from "../service/nextQueue.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-attend-tc',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './attend-tc.component.html',
  styleUrl: './attend-tc.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class AttendTcComponent implements OnInit{
  ticketData: any;
  services: any[] = [];
  successful: boolean = false;
  notSuccessful: boolean = false;
  attended: boolean = false;
  notAttended: boolean = false;
  showMessagePopup: boolean = false;
  message: string = '';

  constructor(
    private ticketService: ticketAttendedTcComponent,
    private serviceService: ServiceService,
    private nextQueueService: nextQueueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketService.getTicketData().subscribe(data => {
      this.ticketData = data;
      console.log("Datos del ticket:", this.ticketData);
    })
    this.obtenerService();
  }
  private obtenerService(): void {
    this.serviceService.obtenerListaDeServicios().subscribe((dato) => {
      this.services = dato;
    });
  }
  markAsSuccessful() {
    if (!this.successful) {
      this.nextQueueService.markAsSuccessful().subscribe(() => {
        this.successful = true;
        this.notSuccessful = false;
        console.log("Ticket marcado como Satisfecho");
      });
    }
  }

  markAsNotSuccessful() {
    if (!this.notSuccessful) {
      this.nextQueueService.markAsNotSuccessful().subscribe(() => {
        this.notSuccessful = true;
        this.successful = false;
        console.log("Ticket marcado como No Satisfecho");
      });
    }
  }
  markAsAttend() {
    if (!this.attended) {
      // Marca como "Atendido" solo si no estaba marcado
      this.nextQueueService.markAsAttend().subscribe(() => {
        this.attended = true;
        this.notAttended = false; // Desmarca "No Atendido" si estaba marcado
        console.log("Ticket marcado como Atendido");
      });
    }
  }

  markAsNotAttend() {
    if (!this.notAttended) {
      // Marca como "No Atendido" solo si no estaba marcado
      this.nextQueueService.markAsNotAttend().subscribe(() => {
        this.notAttended = true;
        this.attended = false; // Desmarca "Atendido" si estaba marcado
        console.log("Ticket marcado como No Atendido");
      });
    }
  }

  finalizarAtencion(){
    const ticketId = this.ticketData.ticketCodeId;
    if (this.ticketData && ticketId) {
      this.nextQueueService.finalizarAtencion(ticketId).subscribe(
        (response) => {
          this.message = response.message;
          this.showMessagePopup = true;
          setTimeout(() => {
            this.showMessagePopup = false;
            this.router.navigate(['/nqc']);
          }, 3000);
        },
        (error) => {
          this.message = "Error al finalizar la atención";
          this.showMessagePopup = true;
          setTimeout(() => {
            this.showMessagePopup = false;
          }, 3000);
        }
      );
    } else {
      console.error("No se encontró el ID del ticket para finalizar la atención.");
    }
  }
}
