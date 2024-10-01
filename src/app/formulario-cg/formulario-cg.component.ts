import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TicketService } from "../ticket.service";
import { CommonModule, NgFor } from "@angular/common";
import { CustomerService } from "../customer.service";
import { DocumentType } from '../document-type.enum';

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
  tipoDocumento: DocumentType;
  numeroDocumento: string = '';
  servicioSeleccionado: string = '';
  formularioValido: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

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

  constructor(private customerService: CustomerService, private router: Router, private ticketService: TicketService) { }

  // Permitir solo números con keydown
  permitirSoloNumeros(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Tab' &&
      key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Delete') {
      event.preventDefault();
    }
  }

  validarFormulario() {
    const documentType = this.getDocumentType(this.tipoDocumento);
    const docNumber = Number(this.numeroDocumento);
    this.formularioValido = this.servicioSeleccionado.trim() !== '';

    if (!this.nombre || !documentType || !docNumber) {
      this.errorMessage = 'Por favor complete todos los campos correctamente.';
      return;
    }

    this.customerService.validarUsuario(this.nombre, documentType, docNumber).subscribe({
      next: (data) => {
        if (data.message) {
          // Mostrar el mensaje de éxito
          this.successMessage = data.message;
          this.errorMessage = '';  // Limpiar mensaje de error si hay éxito
        } else {
          this.successMessage = 'Cliente validado con éxito.';
        }
      },
      error: (err) => {
        this.successMessage = '';  // Limpiar mensaje de éxito si hay error
        this.errorMessage = err.error.message || 'Cliente no encontrado.';
      }
    });
  }



  validarDocumento(): boolean {
    const esDNI = this.tipoDocumento === 'DNI';
    return esDNI
      ? this.numeroDocumento.length === 8
      : this.numeroDocumento.length >= 6 && this.numeroDocumento.length <= 20;
  }

  // Método para convertir el tipo de documento
  getDocumentType(value: string): DocumentType {
    switch (value) {
      case 'DNI':
        return DocumentType.DNI;
      case 'Pasaporte':
        return DocumentType.PASAPORTE;
      case 'Carnet de extranjería':
        return DocumentType.CARNET_EXTRANJERIA;
      case 'PTP':
        return DocumentType.PTP;
      default:
        throw new Error('Tipo de documento no válido');
    }
  }

  generarCodigo() {
    const service = this.servicios.find(s => s.name === this.servicioSeleccionado);
    if (service) {
      const serviceId = service.id;
      const agencyId = 1;

      this.ticketService.generarTicket(this.tipoDocumento, this.nombre, serviceId, agencyId).subscribe({
        next: (response) => {
          this.router.navigate(['/ticket'], { state: { ticket: response } });
        },
        error: (error) => {
          console.error('Error al generar el ticket:', error);
        }
      });
    }
  }
}
