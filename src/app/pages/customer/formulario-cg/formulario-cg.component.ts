import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../../core/service/ticket.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-formulario-cg',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './formulario-cg.component.html',
  styleUrls: ['./formulario-cg.component.css'],
})
export class FormularioCgComponent {
  nombre: string = '';
  servicioSeleccionado: string = '';
  formularioValido: boolean = false;
  errorMessage: string = '';

  servicios = [
    { id: 1, name: 'Portabilidad' },
    { id: 2, name: 'Líneas adicionales' },
    { id: 3, name: 'Pospago' },
    { id: 4, name: 'Prepago' },
    { id: 5, name: 'Renovación' },
    { id: 6, name: 'Migración' },
    { id: 7, name: 'Servicio Técnico' },
    { id: 8, name: 'Reclamo' },
  ];

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}

  validarFormulario() {
    this.formularioValido = this.nombre.trim() !== '' && this.servicioSeleccionado.trim() !== '';
  }

  generarCodigo() {
    if (!this.formularioValido) {
      this.errorMessage = 'Debe completar todos los campos';
      return;
    }

    this.ticketService
      .generarTicket(this.nombre, this.servicioSeleccionado)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/ticket'], {
            state: {
              ticket: {
                code: response.code,
                message: 'Gracias por esperar, pronto será atendido'
              }
            }
          });
        },
        error: (error) => {
          console.error('❌ Error al generar ticket:', error);
          this.errorMessage = 'Hubo un problema al generar el ticket.';
        },
      });
  }
}
