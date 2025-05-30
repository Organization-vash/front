import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../shared/models/service';
import {environment} from "../../assets/environment";

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseURL = `${environment.baseURL}/services`;

  constructor(private httpClient: HttpClient) {}

  obtenerListaDeServicios(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${this.baseURL}`);
  }

  crearServicio(service: Service): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, service);
  }

  actualizarServicio(id: number, service: Service): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, service);
  }

  obtenerServicioPorId(id: number): Observable<Service> {
    return this.httpClient.get<Service>(`${this.baseURL}/${id}`);
  }

  eliminarServicio(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  obtenerServicioPorName(name: string): Observable<Service> {
    return this.httpClient.get<Service>(`${this.baseURL}/name/${name}`);
  }
}
