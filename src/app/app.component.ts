import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaServicesComponent } from './pages/admin/service/lista-services/lista-services.component';
import { ListaUsersComponent } from './pages/admin/lista-users/lista-users.component';
import {GoogleChartsModule} from "angular-google-charts";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    GoogleChartsModule,
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'INSO II ';
}
