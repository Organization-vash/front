import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agency } from '../../shared/models/agency';
import {environment} from "../../assets/environment";

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private baseURL = `${environment.baseURL}/agency`;

  constructor(private httpClient: HttpClient) {}

  obtenerListaDeAgencias(): Observable<Agency[]> {
    return this.httpClient.get<Agency[]>(`${this.baseURL}`);
  }

  crearAgencia(agency: Agency): Observable<Agency> {
    return this.httpClient.post<Agency>(`${this.baseURL}`, agency);
  }

  actualizarAgencia(id: number, agency: Agency): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, agency);
  }

  obtenerAgenciaPorId(id: number): Observable<Agency> {
    return this.httpClient.get<Agency>(`${this.baseURL}/${id}`);
  }

  eliminarAgencia(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
