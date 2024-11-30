import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class nextQueueService {
  private baseURL = 'http://localhost:8080/api/v1/attention'

  constructor(private http: HttpClient) {
  }

  getNextTicketInQueue(moduleId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/next?moduleId=${moduleId}`);
  }

  acceptTicket(moduleId: number): Observable<any> {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const username = loggedUser.username || ''; // Extrae el nombre de usuario

    // Validación adicional para evitar solicitudes con username vacío
    if (!username) {
      throw new Error('El usuario no está autenticado o el nombre no está disponible');
    }

    const headers = new HttpHeaders({ username });
    console.log('Headers enviados:', { username }); // Para depuración

    return this.http.post<any>(`${this.baseURL}/accept?moduleId=${moduleId}`, {}, { headers });
  }


  rejectTicket(): Observable<any> {
    return this.http.post(`${this.baseURL}/reject`, {});
  }

  markAsSuccessful(): Observable<any> {
    return this.http.post(`${this.baseURL}/markAsSuccessful`, {});
  }

  markAsNotSuccessful(): Observable<any> {
    return this.http.post(`${this.baseURL}/markAsNotSuccessful`, {});
  }
  markAsAttend(): Observable<any> {
    return this.http.post(`${this.baseURL}/markAsAttend`, {});
  }

  markAsNotAttend(): Observable<any> {
    return this.http.post(`${this.baseURL}/markAsNotAttend`, {});
  }

  registerSurvey(payload: { value: number }): Observable<any> {
    return this.http.post(`${this.baseURL}/register-survey`, payload);
  }

  finalizarAtencion(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/${id}/finalize`, {});
  }
}
