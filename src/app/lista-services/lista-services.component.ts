import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar Router
import { ServiceService } from '../service.service';
import { Service } from '../service';  // Asegúrate de tener la clase Service importada
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-services.component.html',
  styleUrls: ['./lista-services.component.css']
})

export class ListaServicesComponent implements OnInit {

  services: Service[] = [];

  constructor(private serviceService: ServiceService, private router: Router) { }  // Corregir el tipo de router

  ngOnInit(): void {
    this.obtenerService();
  }

  actualizarService(id: number){
    this.router.navigate(["actualizar-service", id]);  // Navegación
  }
  
  private obtenerService(): void {
    this.serviceService.obtenerListaDeServicios().subscribe(dato => {
      this.services = dato;
    });
  }

  eliminarService(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar al servicio",
      icon: 'warning', // Cambiado 'type' a 'icon'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.eliminarServicio(id).subscribe(dato => {
          console.log(dato);
          this.obtenerService();
          Swal.fire(
            'Servicio eliminado',
            'El servicio ha sido eliminado con exito',
            'success'
          )
        })
      }
    });
  }

  detalleService(id: number) {
    this.router.navigate(['detalle-service', id]);
  }
}
