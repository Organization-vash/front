import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaServicesComponent } from './lista-services/lista-services.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaServicesComponent, LoginComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
