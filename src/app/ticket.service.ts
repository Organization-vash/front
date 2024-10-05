import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:8080/api/v1/generateCode';

  constructor(private http: HttpClient) {}

  generarTicket(document: string, fullname: string, serviceId: number, agencyId: number): Observable<any> {
    const url = `${this.apiUrl}?document=${document}&fullname=${fullname}&serviceId=${serviceId}&agencyId=${agencyId}`;

    return this.http.post(url, {});
  }
}
