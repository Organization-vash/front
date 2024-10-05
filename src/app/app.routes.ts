import {InicioGcComponent} from "./inicio-gc/inicio-gc.component";
import {FormularioCgComponent} from "./formulario-cg/formulario-cg.component";
import {TicketComponent} from "./ticket-cg/ticket-cg.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaUsersComponent } from './lista-users/lista-users.component';
import { CrearUserComponent } from './crear-user/crear-user.component';
import { ActualizarUserComponent } from './actualizar-user/actualizar-user.component';
import { DetalleUserComponent } from './detalle-user/detalle-user.component';
import {ListaServicesComponent} from "./lista-services/lista-services.component";
import {CrearServiceComponent} from "./crear-service/crear-service.component";
import {DetalleServiceComponent} from "./detalle-service/detalle-service.component";
import {ActualizarServiceComponent} from "./actualizar-service/actualizar-service.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: '', component: InicioGcComponent }, // Ruta para la página inicial
  { path: 'formulario', component: FormularioCgComponent },
  { path: 'ticket', component: TicketComponent },

  // Rutas para login
  { path: 'login', component: LoginComponent },

  // Rutas para usuarios
  { path: 'services', component: ListaServicesComponent },
  { path: 'crear-service', component: CrearServiceComponent },
  { path: 'detalle-service/:id', component: DetalleServiceComponent },
  { path: 'actualizar-service/:id', component: ActualizarServiceComponent },

  // Rutas para usuarios
  { path: 'users', component: ListaUsersComponent },
  { path: 'crear-user', component: CrearUserComponent },
  { path: 'detalle-user/:id', component: DetalleUserComponent },
  { path: 'actualizar-user/:id', component: ActualizarUserComponent },

  // Ruta comodín para redirigir si no encuentra otra ruta
  { path: '**', redirectTo: '', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
