import { Component } from '@angular/core';
import {ModuleService} from "../service/module.service";
import { nextQueueService } from "../service/nextQueue.service";
import { Module } from "../service/module.service";
import { FormsModule } from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ticketAttendedTcComponent} from "../attend-tc/ticket-attend-tc.component";

@Component({
  selector: 'app-next-queue',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './next-queue.component.html',
  styleUrl: './next-queue.component.css'
})
export class NextQueueComponent {
  moduleId: number;
  moduleStatus: string | undefined;
  mostrarPopup: boolean = false;
  showAcceptPopup: boolean = false;
  showRejectPopup: boolean = false;

  ticket = {
    ticketCode: '',
    serviceName: '',
    customerDocNumber: '',
    customerFullName: ''
  };

  constructor(private router: Router, private moduleService: ModuleService, private nextQueueService: nextQueueService, private ticketAttendTc: ticketAttendedTcComponent) {}

  fetchModuleStatus(moduleId: number) {
    this.moduleService.getModuleById(moduleId).subscribe(
      (module: Module) => {
        this.moduleStatus = module.moduleStatus;
      },
      (error) => {
        console.error('Error fetching module status:', error);
        this.moduleStatus = undefined;
      }
    );
  }
  mostrarModal() {
    this.nextQueueService.getNextTicketInQueue(this.moduleId).subscribe(
      (response) => {
        this.ticket = {
          ticketCode: response.ticketCode,
          serviceName: response.serviceName,
          customerDocNumber: response.customerDocNumber,
          customerFullName: response.customerFullName
        };
        this.mostrarPopup = true;
      },
      (error) => {
        console.error('Error fetching next ticket:', error);
      }
    );
  }

  aceptarTicket() {
    this.nextQueueService.acceptTicket().subscribe(() => {
      this.mostrarPopup = false;
      this.showAcceptPopup = true;
      setTimeout(() => {
        this.showAcceptPopup = false;
      }, 3000);
      console.log("Ticket aceptado");
      this.router.navigate(['/attention'])
      this.ticketAttendTc.setTicketData(this.ticket);

    });
  }

  rechazarTicket() {
    this.nextQueueService.rejectTicket().subscribe(() => {
      this.mostrarPopup = false;
      this.showRejectPopup = true;
      setTimeout(() => {
        this.showRejectPopup = false;
      }, 3000);
      console.log("Ticket rechazado");
    });
  }
}
