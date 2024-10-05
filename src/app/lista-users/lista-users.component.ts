import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.css']
})
export class ListaUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private serviceService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.serviceService.obtenerListaDeUsuarios().subscribe(data => {
      this.users = data;
    });
  }

  actualizarUser(id: number){
    this.router.navigate(["actualizar-user", id]);  // Navegación
  }

  eliminarUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar al usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.eliminarUsuario(id).subscribe(dato => {
          console.log(dato);
          this.ngOnInit();  // Recarga la lista de usuarios
          Swal.fire(
            'Usuario eliminado',
            'El usuario ha sido eliminado con éxito',
            'success'
          );
        }, error => {
          Swal.fire(
            'Error',
            'Hubo un error al intentar eliminar el usuario',
            'error'
          );
        });
      }
    });
  }

  detalleUser(id: number) {
    this.router.navigate(['detalle-user', id]);
  }
}
