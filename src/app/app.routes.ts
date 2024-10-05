import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaServicesComponent } from './lista-services/lista-services.component';
import { CrearServiceComponent } from './crear-service/crear-service.component';
import { ActualizarServiceComponent } from './actualizar-service/actualizar-service.component';
import { DetalleServiceComponent } from './detalle-service/detalle-service.component';

export const routes: Routes = [
  { path: 'services', component: ListaServicesComponent },  // Ruta hacia el componente de servicios
  { path: '', redirectTo: '/services', pathMatch: 'full' },  // Redirige la ruta raíz
  {path: "crear-service",component:CrearServiceComponent},
  {path : 'detalle-service/:id',component : DetalleServiceComponent},
  {path : 'actualizar-service/:id',component : ActualizarServiceComponent},
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListaServicesComponent} from "./lista-services/lista-services.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lista-services', component: ListaServicesComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
}) 
export class AppRoutesModule {}
