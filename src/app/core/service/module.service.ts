import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../assets/environment';

export interface Module {
  id: number;
  createdAt: string;
  updatedAt: string;
  moduleStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseURL = `${environment.baseURL}/modules`;

  constructor(private httpClient: HttpClient) {}

  obtenerListaDeModulos(): Observable<Module[]> {
    return this.httpClient.get<Module[]>(`${this.baseURL}`);
  }

  crearModulo(module: Module): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, module);
  }

  actualizarModulo(module: Module): Observable<Object> {
    console.log('Payload enviado al backend:', module);
    return this.httpClient.put(`${this.baseURL}`, module);
}

  obtenerModuloPorId(id: number): Observable<Module> {
    return this.httpClient.get<Module>(`${this.baseURL}/${id}`);
  }

  eliminarModulo(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
