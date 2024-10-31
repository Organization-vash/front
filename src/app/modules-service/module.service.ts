import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseURL = 'http://localhost:8080/api/v1/modules';  // URL del backend

  constructor(private httpClient: HttpClient) {}

  // Obtener lista de módulos
  obtenerListaDeModulos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/all`);
  }

  // Crear un nuevo módulo
  crearModulo(module: any): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/create`, module);
  }

  // Actualizar un módulo
  actualizarModulo(module: any): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/change-status`, module);
  }

  // Obtener un módulo por ID
  obtenerModuloPorId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/${id}`);
  }

  // Eliminar un módulo
  eliminarModulo(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
