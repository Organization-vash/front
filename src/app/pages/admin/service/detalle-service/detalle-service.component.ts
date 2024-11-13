import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../../../shared/models/service';
import { ServiceService } from '../../../../core/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-service',
  standalone: true,
  imports: [],
  templateUrl: './detalle-service.component.html',
  styleUrl: './detalle-service.component.css',
})
export class DetalleServiceComponent {
  id: number;
  service: Service;
  constructor(
    private route: ActivatedRoute,
    private serviceServicie: ServiceService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service = new Service();
    this.serviceServicie.obtenerServicioPorId(this.id).subscribe((dato) => {
      this.service = dato;
      Swal.fire(`Detalles del servicio ${this.service.name}`);
    });
  }
}
