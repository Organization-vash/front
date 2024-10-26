import { Component } from '@angular/core';
import { ServiceService } from "../service/service.service";
import { Module } from "../service/module.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-next-queue',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './next-queue.component.html',
  styleUrl: './next-queue.component.css'
})
export class NextQueueComponent {
  moduleId: number | null = null;
  moduleStatus: string | null = null;

  constructor(private moduleService: ServiceService) {}

  fetchModuleStatus(): void{
    if(this.moduleId){
      this.moduleService.getModuleById(this.moduleId).subscribe(
        (module: Module) => {
          return this.moduleStatus = module.moduleStatus;
        },
        error => {
          console.error("Error al obtener el módulo", error);
          this.moduleStatus = "Modulo no encontrado";
        }
      );
    }
  }
  goToNextInQueue(): void {
    console.log("Función siguiente en cola");
  }
}
