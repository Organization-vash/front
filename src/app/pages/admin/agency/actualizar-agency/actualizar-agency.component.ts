import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Agency } from '../../../../shared/models/agency';
import { AgencyService } from '../../../../core/service/agency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-agency',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './actualizar-agency.component.html',
  styleUrl: './actualizar-agency.component.css',
})
export class ActualizarAgencyComponent implements OnInit {
  id: number;
  agency: Agency = new Agency();

  constructor(
    private agencyService: AgencyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.agencyService
      .obtenerAgenciaPorId(this.id)
      .pipe(
        tap((dato) => {
          this.agency = dato;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }

  iralaListadeAgencias(): void {
    this.router.navigate(['/agency']);
    Swal.fire(
      'Agencia actualizada',
      `La agencia ${this.agency.seat} ha sido actualizada con éxito`,
      'success'
    );
  }

  onSubmit(): void {
    this.agencyService
      .actualizarAgencia(this.id, this.agency)
      .pipe(
        tap(() => {
          this.iralaListadeAgencias(); // Redirigir después de actualizar
        }),
        catchError((error) => {
          console.error('Error al actualizar la agencia:', error);
          return of(null); // Retorna un observable vacío en caso de error
        })
      )
      .subscribe();
  }
}
