import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleService } from '../../../core/service/module.service';

@Component({
  selector: 'app-list-modules',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de incluir CommonModule y FormsModule
  templateUrl: './list-modules.component.html',
  styleUrls: ['./list-modules.component.css'],
})
export class ListaModulesComponent implements OnInit {
  modules: any[] = [];

  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.moduleService.obtenerListaDeModulos().subscribe((data) => {
      this.modules = data;
    });
  }
}
