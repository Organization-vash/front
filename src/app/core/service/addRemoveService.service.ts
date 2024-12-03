import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddRemoveService {
  private baseUrl = 'http://localhost:8080/api/v1/attention'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  addServiceToAttention(attentionId: number, serviceId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${attentionId}/add-service`, null, {
      params: { serviceId: serviceId.toString() }
    });
  }

  removeServiceFromAttention(attentionId: number, serviceId: number): Observable<any> {
    if (!attentionId || !serviceId) {
      console.error('Attention ID o Service ID no válido:', { attentionId, serviceId });
      throw new Error('Attention ID o Service ID no válido');
    }

    // Verifica qué datos se están enviando
    console.log('Enviando solicitud para eliminar servicio:', { attentionId, serviceId });

    return this.http.post(`${this.baseUrl}/${attentionId}/remove-service`, null, {
      params: { serviceId: serviceId.toString() }, // Asegurarse de enviar el parámetro correctamente
    });
  }
}
