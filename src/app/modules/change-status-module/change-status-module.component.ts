import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; 
import { ModuleService } from '../../modules-service/module.service';

@Component({
  selector: 'app-change-status-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-status-module.component.html',
  styleUrls: ['./change-status-module.component.css']
})
export class ChangeStatusModuleComponent {
  moduleId: number;
  newStatus: string;
  isLoading: boolean = false;

  constructor(private moduleService: ModuleService) {}

  changeStatus(): void {
      this.isLoading = true;
      const requestPayload = {
          id: this.moduleId,
          moduleStatus: this.newStatus
      };

      // Validación del estado RECESS
      if (this.newStatus === 'RECESS') {
          const now = new Date();
          const hour = now.getHours();
          if (hour < 12 || hour >= 15) {
              alert('No puedes activar el estado de RECESS fuera del rango permitido (12:00 a 15:00).');
              this.isLoading = false;
              return;
          }
      }

      // Confirmación para INACTIVE
      if (this.newStatus === 'INACTIVE') {
          const confirmInactive = window.confirm('¿Está seguro de que desea desactivar el módulo?');
          if (!confirmInactive) {
              this.isLoading = false;
              return;
          }
      }

      // Llamada al servicio
      this.moduleService.actualizarModulo(requestPayload).subscribe(
          (response: any) => {
              alert('Estado del módulo actualizado: ' + response.message);
              this.isLoading = false;
          },
          (error) => {
              console.error(error);
              this.isLoading = false;
          }
      );
  }
}
