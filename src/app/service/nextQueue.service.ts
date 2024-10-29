import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class nextQueueService {
  private baseURL = 'http://localhost:8080/api/v1/attention'

  constructor(private http: HttpClient) {}

  getNextTicketInQueue(moduleId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/next?moduleId=${moduleId}`);
  }

  acceptTicket(): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/accept`, {});
  }

  rejectTicket(): Observable<any> {
    return this.http.post(`${this.baseURL}/reject`, {});
  }
}
