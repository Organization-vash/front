import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/v1/chat/pregunta'; // URL del backend

  constructor(private http: HttpClient) {}

  sendQuestion(pregunta: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, { pregunta });
  }
}
