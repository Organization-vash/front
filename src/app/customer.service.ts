import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentType } from './document-type.enum';  // Importamos el enum para el tipo de documento

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private apiURL = 'http://localhost:8080/api/v1/customers/valida';  // URL del backend

  constructor(private http: HttpClient) {}

  // Método para validar los datos del cliente
  validarUsuario(fullname: string, documentType: DocumentType, docNumber: number): Observable<any> {
    // Creamos un objeto `payload` con los datos que se enviarán al backend
    const payload = {
      fullname,
      documentType,
      docNumber
    };

    // Enviamos los datos al backend mediante una petición POST
    return this.http.post<any>(this.apiURL, payload);
  }
}
