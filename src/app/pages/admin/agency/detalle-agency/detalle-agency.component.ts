import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { Agency } from '../../../../shared/models/agency';
import { AgencyService } from '../../../../core/service/agency.service';

@Component({
  selector: 'app-detalle-agency',
  standalone: true,
  imports: [],
  templateUrl: './detalle-agency.component.html',
  styleUrl: './detalle-agency.component.css',
})
export class DetalleAgencyComponent {
  id: number;
  agency: Agency;

  constructor(
    private route: ActivatedRoute,
    private agencyService: AgencyService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.agency = new Agency();
    this.agencyService.obtenerAgenciaPorId(this.id).subscribe((dato) => {
      this.agency = dato;
      Swal.fire(`Detalles de la agencia ${this.agency.seat}`);
    });
  }
}
