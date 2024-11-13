import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleService } from '../../../core/service/module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css'],
})
export class CreateModuleComponent implements OnInit {
  module: any = {
    id: null,
    number: null,
    status: 'INACTIVE',
  };
  isLoading: boolean = false;

  constructor(private moduleService: ModuleService, private router: Router) {}

  ngOnInit(): void {}

  irALaListaDeModulos() {
    // Redirigir explícitamente a /list-modules
    this.router.navigate(['/list-modules']);
  }

  onSubmit() {
    if (this.module.number) {
      this.module.id = this.module.number; // Asignamos el número ingresado como el ID
      const requestPayload = {
        id: this.module.id,
        moduleStatus: 'INACTIVE', // Estado inicial siempre es INACTIVE
      };
      this.guardarModule(requestPayload);
    }
  }

  guardarModule(requestPayload: any) {
    this.isLoading = true;
    this.moduleService.crearModulo(requestPayload).subscribe(
      (dato) => {
        console.log('Módulo creado con éxito:', dato);
        this.isLoading = false;
        this.irALaListaDeModulos(); // Redirigir después de creación exitosa
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        if (error.status === 400) {
          // Error 400 para ID duplicado
          alert('El ID del módulo ya existe. Por favor, elige otro ID.');
        }
      }
    );
  }
  checkModuleNumber() {
    // Verifica si el número del módulo es mayor a 0
    if (this.module.number && this.module.number > 0) {
      console.log('Número del módulo válido:', this.module.number);
    } else {
      console.log('Número del módulo inválido o no presente.');
    }
  }
}
