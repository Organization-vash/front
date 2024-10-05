import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importa RouterModule para usar router-outlet
import { ListaServicesComponent } from './lista-services/lista-services.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [CommonModule, RouterModule, ListaServicesComponent],  // Asegúrate de que RouterModule está en los imports

  imports: [ListaServicesComponent, LoginComponent, RouterOutlet],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'GESTION DE SERVICIO';
}
