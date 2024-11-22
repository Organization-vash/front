import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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
    return this.http.post<any>(`${this.baseURL}/accept?moduleId=${moduleId}`, {});
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

  finalizarAtencion(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/${id}/finalize`, {});
  }
}