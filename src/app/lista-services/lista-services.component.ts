import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-lista-services',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de incluir CommonModule aquí
  templateUrl: './lista-services.component.html',
  styleUrls: ['./lista-services.component.css']
})
export class ListaServicesComponent implements OnInit {
  services: any = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.obtenerListaDeServicios().subscribe(data => {
      this.services = data;
      console.log(this.services);
    });
  }
}
