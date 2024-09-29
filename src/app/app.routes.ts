import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaServicesComponent } from './lista-services/lista-services.component';
import { CrearServiceComponent } from './crear-service/crear-service.component';
import { ActualizarServiceComponent } from './actualizar-service/actualizar-service.component';

export const routes: Routes = [
  { path: 'services', component: ListaServicesComponent },  // Ruta hacia el componente de servicios
  { path: '', redirectTo: '/services', pathMatch: 'full' },  // Redirige la ruta raíz
  {path: "crear-service",component:CrearServiceComponent},

  {path : 'actualizar-service/:id',component : ActualizarServiceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
