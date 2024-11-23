import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from "@angular/common";
import { ChatBoxComponent } from '../chat-box/chat-box.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket-cg.component.html',
  standalone: true,
  styleUrls: ['./ticket-cg.component.css'],
  imports: [CommonModule, ChatBoxComponent]
})
export class TicketComponent {
  codigo: string;
  mensaje: string;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as { ticket: { code: string, message: string } };
    this.codigo = state.ticket.code;
    this.mensaje = state.ticket.message;
  }
}
