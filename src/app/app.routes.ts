import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaServicesComponent } from './lista-services/lista-services.component';
import { CrearServiceComponent } from './crear-service/crear-service.component';

export const routes: Routes = [
  { path: 'services', component: ListaServicesComponent },  // Ruta hacia el componente de servicios
  { path: '', redirectTo: '/services', pathMatch: 'full' },  // Redirige la ruta raíz
  {path: "crear-service",component:CrearServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
