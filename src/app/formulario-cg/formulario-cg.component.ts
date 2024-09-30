import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {TicketService} from "../ticket.service";
import {CommonModule, NgFor} from "@angular/common";

@Component({
  selector: 'app-formulario-cg',
  standalone: true,
  imports: [
    FormsModule, NgFor, CommonModule
  ],
  templateUrl: './formulario-cg.component.html',
  styleUrls: ['./formulario-cg.component.css']
})
export class FormularioCgComponent {
  nombre: string = '';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  servicioSeleccionado: string = '';
  formularioValido: boolean = false;

  servicios = [
    { id: 1, name: 'Portabilidad' },
    { id: 2, name: 'Líneas adicionales' },
    { id: 3, name: 'Pospago' },
    { id: 4, name: 'Prepago' },
    { id: 5, name: 'Renovación' },
    { id: 6, name: 'Migración' },
    { id: 7, name: 'Servicio Técnico' },
    { id: 8, name: 'Reclamo' }
  ];

  constructor(private router: Router, private ticketService: TicketService) {}

  validarFormulario() {
    this.formularioValido = this.nombre.trim() !== '' &&
      this.tipoDocumento.trim() !== '' &&
      this.numeroDocumento.trim() !== '' &&
      this.servicioSeleccionado.trim() !== '';
  }

  generarCodigo() {
    const service = this.servicios.find(s => s.name === this.servicioSeleccionado);
    if (service) {
      const serviceId = service.id;
      const agencyId = 1;

      this.ticketService.generarTicket(this.tipoDocumento, this.nombre, serviceId, agencyId).subscribe(
        (response) => {
          this.router.navigate(['/ticket'], { state: { ticket: response } });
        },
        (error) => {
          console.error('Error al generar el ticket:', error);
        }
      );
    }
  }
}
