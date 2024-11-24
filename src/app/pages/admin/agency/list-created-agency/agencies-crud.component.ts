import { Component, OnInit } from '@angular/core';
import { Agency } from '../../../../shared/models/agency';
import { AgencyService } from '../../../../core/service/agency.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agencies-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agencies-crud.component.html',
  styleUrl: './agencies-crud.component.css',
})
export class AgencyComponent implements OnInit {
  agency: Agency = new Agency();
  agencies: Agency[] = [];

  constructor(private agencyService: AgencyService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerAgency();
  }

  private obtenerAgency(): void {
    this.agencyService.obtenerListaDeAgencias().subscribe((dato) => {
      this.agencies = dato;
    });
  }

  guardarAgency() {
    this.agencyService.crearAgencia(this.agency).subscribe(
      (dato) => {
        console.log(dato);
        this.iralaListadeAgencias();
      },
      (error) => console.log(error)
    );
  }

  iralaListadeAgencias() {
    this.router.navigate(['/agency']);
  }

  onSubmit() {
    this.guardarAgency();
  }

  eliminarAgency(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar la agencia',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.agencyService.eliminarAgencia(id).subscribe((dato) => {
          console.log(dato);
          this.obtenerAgency();
          Swal.fire(
            'Agencia eliminada',
            'La agencia ha sido eliminada con éxito',
            'success'
          );
        });
      }
    });
  }

  detalleAgency(id: number) {
    this.router.navigate(['detalle-agency', id]);
  }

  actualizarAgency(id: number) {
    this.router.navigate(['actualizar-agency', id]);
  }

}
