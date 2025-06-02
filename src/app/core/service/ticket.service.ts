import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketCode } from '../../shared/models/search-code.model';
import {environment} from "../../assets/environment";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = `${environment.baseURL}/codes`;

  constructor(private http: HttpClient) {}

  generarTicket(customerName: string, serviceName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {customerName, serviceName});
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
