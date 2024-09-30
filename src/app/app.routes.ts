import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaUsersComponent } from './lista-users/lista-users.component';

export const routes: Routes = [
    { path: 'users', component: ListaUsersComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' },

];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }