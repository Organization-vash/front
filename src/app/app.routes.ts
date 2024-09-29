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
}) export class AppRoutesModule {}
