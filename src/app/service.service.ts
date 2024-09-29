import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './service';  // Tu modelo de Service

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseURL = 'http://localhost:8080/api/v1/admin/service';  // URL del backend

  constructor(private httpClient: HttpClient) {}

  obtenerListaDeServicios(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${this.baseURL}`);
  }
}
