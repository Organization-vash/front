import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-inicio-gc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-gc.component.html',
  styleUrl: './inicio-gc.component.css'
})
export class InicioGcComponent {
  constructor(private router: Router) {}

  comenzar(){
    this.router.navigate(['/formulario']);
  }
}
