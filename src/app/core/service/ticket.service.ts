import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketCode } from '../../shared/models/search-code.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:8080/api/v1/code';

  constructor(private http: HttpClient) {}

  generarTicket(document: string, fullname: string, serviceId: number, agencyId: number): Observable<any> {
    const url = `${this.apiUrl}/generateCode?document=${document}&fullname=${fullname}&serviceId=${serviceId}&agencyId=${agencyId}`;

    return this.http.post(url, {});
  }

  searchTickets(searchTerm: string): Observable<TicketCode[]> {
    return this.http.get<TicketCode[]>(`${this.apiUrl}/search?code=${searchTerm}`);
  }

  transferTicket(ticketId: number, moduleId: number): Observable<any> {
    const url = `${this.apiUrl}/derivate?ticketId=${ticketId}&moduleId=${moduleId}`;

    return this.http.post<any>(url, {});
  }

  getTicketFromLocalStorage() {
    const ticketData = localStorage.getItem('ticketData');
    return ticketData ? JSON.parse(ticketData) : null;
  }
}
