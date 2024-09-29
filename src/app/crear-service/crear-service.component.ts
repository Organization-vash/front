import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from '../service';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-service.component.html',
  styleUrls: ['./crear-service.component.css']
})
export class CrearServiceComponent implements OnInit {

  service: Service = new Service();

  constructor(private serviceService:ServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  guardarService(){
    this.serviceService.crearServicio(this.service).subscribe(dato => {
      console.log(dato);
      this.iralaListadeServicios();
    }, error => console.log(error));
  }

  iralaListadeServicios(){
    this.router.navigate(["/services"])
  }

  onSubmit() {
    this.guardarService();
  }
}
