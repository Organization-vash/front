import {Component, Injectable, OnInit} from '@angular/core';
import {ticketAttendedTcComponent} from "./ticket-attend-tc.component";
import {NgForOf, NgIf} from "@angular/common";
import {ServiceService} from "../service/service.service";

@Component({
  selector: 'app-attend-tc',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
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
  chosenServices: any[] = [];

  constructor(private ticketService: ticketAttendedTcComponent, private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.ticketService.getTicketData().subscribe(data => {
      this.ticketData = data;
    })
    this.obtenerService();
  }
  private obtenerService(): void {
    this.serviceService.obtenerListaDeServicios().subscribe((dato) => {
      this.services = dato;
    });
  }
}
