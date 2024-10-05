import {RouterModule, Routes} from '@angular/router';
import {InicioGcComponent} from "./inicio-gc/inicio-gc.component";
import {FormularioCgComponent} from "./formulario-cg/formulario-cg.component";
import {TicketComponent} from "./ticket-cg/ticket-cg.component";
import {NgModule} from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaUsersComponent } from './lista-users/lista-users.component';
import { CrearUserComponent } from './crear-user/crear-user.component';
import { ActualizarUserComponent } from './actualizar-user/actualizar-user.component';
import { DetalleUserComponent } from './detalle-user/detalle-user.component';

export const routes: Routes = [
  { path: '', component: InicioGcComponent },
  { path: 'formulario', component: FormularioCgComponent },
  { path: 'ticket', component: TicketComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
export const routes: Routes = [
    { path: 'users', component: ListaUsersComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    {path: "crear-user",component:CrearUserComponent},
    {path : 'detalle-user/:id',component : DetalleUserComponent},
    {path : 'actualizar-user/:id',component : ActualizarUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
