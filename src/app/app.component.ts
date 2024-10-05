import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaServicesComponent } from './lista-services/lista-services.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaUsersComponent } from './lista-users/lista-users.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [CommonModule, ListaServicesComponent, RouterOutlet],
  imports: [CommonModule, RouterModule, ListaUsersComponent],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GESTION DE USUARIOS';
}