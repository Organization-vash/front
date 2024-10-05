import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { Router, ActivatedRoute } from '@angular/router';  // Importar Router y ActivatedRoute
import { ServiceService } from '../service.service';
import { Service } from '../service';
import { tap, catchError } from 'rxjs/operators';  // Importar operadores de RxJS
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-service',
  standalone: true,
  imports: [FormsModule],  // Importar FormsModule para ngModel
  templateUrl: './actualizar-service.component.html',
  styleUrls: ['./actualizar-service.component.css']
})

export class ActualizarServiceComponent implements OnInit {

  id: number;
  service: Service = new Service();

  constructor(private serviceService: ServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.serviceService.obtenerServicioPorId(this.id).pipe(
      tap(dato => {
        this.service = dato;
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe();
  }

  irAlaListaDeServicios(): void {
    this.router.navigate(['/services']);
    Swal.fire('Servicio actualizado', `El servicio ${this.service.name} ha sido actualizado con éxito`, 'success');
  }

  onSubmit(): void {
    this.serviceService.actualizarServicio(this.id, this.service).pipe(
      tap(() => {
        this.irAlaListaDeServicios();  // Redirigir después de actualizar
      }),
      catchError(error => {
        console.error('Error al actualizar el servicio:', error);
        return of(null);  // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }
}
