import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

export interface Module {
  id: number;
  createdAt: string;
  updatedAt: string;
  moduleStatus: string;
  confirmDeactivation: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ModuleService{
  private baseURL = 'http://localhost:8080/api/v1/modules'

  constructor(private httpClient: HttpClient) {}

  getModuleById(moduleId: number): Observable<Module> {
    return this.httpClient.get<Module>(`${this.baseURL}/${moduleId}`);
  }
}
