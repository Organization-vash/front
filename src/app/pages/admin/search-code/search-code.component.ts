import { Component } from '@angular/core';
import { TicketCode } from '../../../shared/models/search-code.model';
import { TicketService } from '../../../core/service/ticket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-code',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-code.component.html',
  styleUrl: './search-code.component.css'
})
export class SearchCodeComponent {
  searchTerm: string = '';
  tickets: TicketCode[] = [];
  searchPerformed = false;

  constructor(private ticketSearchService: TicketService) {}

  searchTickets(): void {
    if (!this.searchTerm.trim()) {
      this.tickets = [];
      this.searchPerformed = false;
      return;
    }

    this.ticketSearchService.searchTickets(this.searchTerm).subscribe({
      next: (data) => {
        this.tickets = data;
        this.searchPerformed = true;
      },
      error: (err) => {
        console.error('Error al buscar tickets:', err);
        this.tickets = [];
        this.searchPerformed = true;
      },
    });
  }
}
