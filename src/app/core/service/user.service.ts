import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:8080/api/v1/admin/users';

  constructor(private httpClient: HttpClient) {}

  obtenerListaDeUsuarios(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  crearUsuario(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, user);
  }

  actualizarUsuario(id: number, user: User): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }

  obtenerUsuarioPorId(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  eliminarUsuario(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  buscarUsuarioPorNombreONumberDoc(
    name?: string,
    numberDoc?: number
  ): Observable<User[]> {
    // Construir los parámetros de búsqueda dinámicamente
    let params: any = {};
    if (name && name.trim() !== '') {
      params.name = name;
    }
    if (numberDoc) {
      params.numberDoc = numberDoc;
    }

    // Realizar la solicitud GET con los parámetros de búsqueda
    return this.httpClient.get<User[]>(`${this.baseURL}/search`, { params });
  }
}
