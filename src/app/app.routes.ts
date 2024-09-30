import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaUsersComponent } from './lista-users/lista-users.component';
import { CrearUserComponent } from './crear-user/crear-user.component';

export const routes: Routes = [
    { path: 'users', component: ListaUsersComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    {path: "crear-user",component:CrearUserComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }