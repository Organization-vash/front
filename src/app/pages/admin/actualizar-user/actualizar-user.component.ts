import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-user.component.html',
  styleUrl: './actualizar-user.component.css',
})
export class ActualizarUserComponent implements OnInit {
  id: number;
  user: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService
      .obtenerUsuarioPorId(this.id)
      .pipe(
        tap((dato) => {
          this.user = dato;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }

  irAlaListaDeUsuarios(): void {
    this.router.navigate(['/users']);
    Swal.fire(
      'Usuario actualizado',
      `El usuario ${this.user.name} ha sido actualizado con éxito`,
      'success'
    );
  }

  onSubmit(): void {
    this.userService
      .actualizarUsuario(this.id, this.user)
      .pipe(
        tap(() => {
          this.irAlaListaDeUsuarios();
        }),
        catchError((error) => {
          console.error('Error al actualizar el usuario:', error);
          return of(null);
        })
      )
      .subscribe();
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
