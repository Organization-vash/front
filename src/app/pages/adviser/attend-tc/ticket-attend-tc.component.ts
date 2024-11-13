import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ticketAttendedTcComponent {
  private ticketData = new BehaviorSubject<any>(null);

  setTicketData(data:any): void{
    this.ticketData.next(data);
  }

  getTicketData(): Observable<any> {
    return this.ticketData.asObservable();
  }
}
