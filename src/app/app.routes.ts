import { InicioGcComponent } from './pages/customer/inicio-gc/inicio-gc.component';
import { FormularioCgComponent } from './pages/customer/formulario-cg/formulario-cg.component';
import { TicketComponent } from './pages/customer/ticket-cg/ticket-cg.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { ActualizarServiceComponent } from './pages/admin/service/actualizar-service/actualizar-service.component';

import { NextQueueComponent } from './pages/adviser/next-queue/next-queue.component';
import { AttendTcComponent } from './pages/adviser/attend-tc/attend-tc.component';

import { CreateModuleComponent } from './pages/admin/create-module/create-module.component';
import { ActualizarUserComponent } from './pages/admin/actualizar-user/actualizar-user.component';
import { CrearUserComponent } from './pages/admin/crear-user/crear-user.component';
import { DetalleServiceComponent } from './pages/admin/service/detalle-service/detalle-service.component';
import { DetalleUserComponent } from './pages/admin/detalle-user/detalle-user.component';
import { ListaServicesComponent } from './pages/admin/service/lista-services/lista-services.component';
import { ListaUsersComponent } from './pages/admin/lista-users/lista-users.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ListaModulesComponent } from './pages/admin/list-modules/list-modules.component';
import { CrearServiceComponent } from './pages/admin/service/crear-service/crear-service.component';
import { SearchCodeComponent } from './pages/admin/search-code/search-code.component';

export const routes: Routes = [
  { path: '', component: InicioGcComponent }, // Ruta para la página inicial
  { path: 'formulario', component: FormularioCgComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'nqc', component: NextQueueComponent },
  { path: 'attention', component: AttendTcComponent },

  // Rutas para login
  { path: 'login', component: LoginComponent },

  // Rutas para usuarios
  { path: 'services', component: ListaServicesComponent },
  { path: 'crear-service', component: CrearServiceComponent },
  { path: 'detalle-service/:id', component: DetalleServiceComponent },
  { path: 'actualizar-service/:id', component: ActualizarServiceComponent },
  { path: 'search-code', component: SearchCodeComponent },

  // Rutas para usuarios
  { path: 'users', component: ListaUsersComponent },
  { path: 'crear-user', component: CrearUserComponent },
  { path: 'detalle-user/:id', component: DetalleUserComponent },
  { path: 'actualizar-user/:id', component: ActualizarUserComponent },

  // Rutas para lo de modulos
  { path: 'list-modules', component: ListaModulesComponent },
  { path: 'create-module', component: CreateModuleComponent },
  // Ruta comodín para redirigir si no encuentra otra ruta
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
