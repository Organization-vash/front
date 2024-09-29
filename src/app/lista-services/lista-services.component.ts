import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar Router
import { ServiceService } from '../service.service';
import { Service } from '../service';  // Asegúrate de tener la clase Service importada

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

  eliminarService(id: number): void {
    this.serviceService.eliminarServicio(id).subscribe(dato => {
      console.log(dato);
      this.obtenerService();  // Corregir el nombre del método
    });
  }

  private obtenerService(): void {
    this.serviceService.obtenerListaDeServicios().subscribe(dato => {
      this.services = dato;
    });
  }
}
