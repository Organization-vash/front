import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketNotificacionService {
  private baseUrl = 'http://localhost:8080/api/v1/tickets'; // Cambia la URL base según tu configuración

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de tickets que están en estado "ATTENDING".
   * @returns Un observable con la lista de tickets.
   */
  getAttendingTickets(): Observable<{ code: string; module: string }[]> {
    return this.http.get<{ code: string; module: string }[]>(`${this.baseUrl}/attending`);
  }

  /**
   * Obtiene el ticket actual que está en estado "WAITING".
   * @returns Un observable con los datos del ticket actual.
   */
  getCurrentTicket(): Observable<{ code: string }> {
    return this.http.get<{ code: string }>(`${this.baseUrl}/current`);
  }
}
