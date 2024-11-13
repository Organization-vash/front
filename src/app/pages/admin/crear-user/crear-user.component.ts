import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-user.component.html',
  styleUrl: './crear-user.component.css',
})
export class CrearUserComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  guardarUser() {
    this.userService.crearUsuario(this.user).subscribe(
      (dato) => {
        console.log(dato);
        this.iralaListadeUsuarios();
      },
      (error) => console.log(error)
    );
  }

  iralaListadeUsuarios() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    this.guardarUser();
  }

  restrictInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const charCode = event.which ? event.which : event.keyCode;

    // Limitar longitud dependiendo del tipo de documento
    const maxLength = this.user.documentType === 'DNI' ? 8 : 20;

    // Si el valor actual ya tiene el máximo de caracteres, evita más entradas
    if (input.value.length >= maxLength) {
      event.preventDefault();
      return; // Sal de la función si ya alcanzó la longitud máxima
    }

    // Permitir solo números (charCode entre 48 y 57)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
