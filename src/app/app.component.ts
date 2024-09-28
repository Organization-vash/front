import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaServicesComponent } from './lista-services/lista-services.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaServicesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-servicio-frontend';
}
