import {RouterModule, Routes} from '@angular/router';
import {InicioGcComponent} from "./inicio-gc/inicio-gc.component";
import {FormularioCgComponent} from "./formulario-cg/formulario-cg.component";
import {TicketComponent} from "./ticket-cg/ticket-cg.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', component: InicioGcComponent },
  { path: 'formulario', component: FormularioCgComponent },
  { path: 'ticket', component: TicketComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
