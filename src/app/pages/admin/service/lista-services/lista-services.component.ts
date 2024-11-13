import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Router } from '@angular/router';
import { Service } from '../../../../shared/models/service';
import { ServiceService } from '../../../../core/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-services',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './lista-services.component.html',
  styleUrls: ['./lista-services.component.css'],
})
export class ListaServicesComponent implements OnInit {
  searchTerm: string = '';

  services: Service[] = [];

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerService();
  }

  actualizarService(id: number) {
    this.router.navigate(['actualizar-service', id]);
  }

  private obtenerService(): void {
    this.serviceService.obtenerListaDeServicios().subscribe((dato) => {
      this.services = dato;
    });
  }

  eliminarService(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al servicio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.eliminarServicio(id).subscribe((dato) => {
          console.log(dato);
          this.obtenerService();
          Swal.fire(
            'Servicio eliminado',
            'El servicio ha sido eliminado con éxito',
            'success'
          );
        });
      }
    });
  }

  detalleService(id: number) {
    this.router.navigate(['detalle-service', id]);
  }

  // Método para filtrar los servicios
  serviciosFiltrados() {
    if (!this.searchTerm) {
      return this.services;
    }
    return this.services.filter((service) =>
      service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  buscarServicePorNombre(): void {
    const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(this.searchTerm)) {
      Swal.fire(
        'Entrada no válida',
        'Por favor, ingresa solo letras en el campo de búsqueda',
        'error'
      );
      return;
    }

    if (this.searchTerm.trim() !== '') {
      this.serviceService.obtenerServicioPorName(this.searchTerm).subscribe(
        (service) => {
          this.services = [service];
        },
        (error) => {
          Swal.fire(
            'No se encontró coincidencia',
            `El servicio con el nombre "${this.searchTerm}" no fue encontrado`,
            'error'
          );
          this.obtenerService();
        }
      );
    } else {
      this.obtenerService();
    }
  }
}
