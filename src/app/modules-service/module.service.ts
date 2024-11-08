import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para definir la estructura del módulo
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
  private baseURL = 'http://localhost:8080/api/v1/modules';  // URL del backend

  constructor(private httpClient: HttpClient) {}

  // Obtener lista de módulos
  obtenerListaDeModulos(): Observable<Module[]> {
    return this.httpClient.get<Module[]>(`${this.baseURL}/all`);
  }

  // Crear un nuevo módulo
  crearModulo(module: Module): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/create`, module);
  }

  // Actualizar un módulo
  actualizarModulo(module: Module): Observable<Object> {
    console.log('Payload enviado al backend:', module);
    return this.httpClient.put(`${this.baseURL}/change-status`, module);
}

  // Obtener un módulo por ID
  obtenerModuloPorId(id: number): Observable<Module> {
    return this.httpClient.get<Module>(`${this.baseURL}/${id}`);
  }

  // Eliminar un módulo
  eliminarModulo(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
