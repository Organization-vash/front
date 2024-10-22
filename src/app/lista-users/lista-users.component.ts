import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-users',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.css']
})
export class ListaUsersComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = ''; // Usar una sola variable para la búsqueda

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.obtenerListaDeUsuarios().subscribe(data => {
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
        this.userService.eliminarUsuario(id).subscribe(dato => {
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


  buscarUsuarioporNombreoNro(): void {
    if (this.searchTerm.trim() !== '') {
      const isNumber = /^\d+$/.test(this.searchTerm); // Verifica si el término es un número
  
      if (isNumber) {
        // Si es un número, buscar por número de documento
        this.userService.buscarUsuarioPorNombreONumberDoc(undefined, +this.searchTerm).subscribe(
          (data) => {
            if (data && data.length > 0) {
              this.users = data; // Actualizar la lista de usuarios si hay resultados
            }
          },
          (error) => {
            console.error('Error al buscar usuario:', error);
            Swal.fire(
              'Error',
              `El usuario con número de documento "${this.searchTerm}" no fue encontrado`,
              'error'
            );
            this.users = []; // Limpiar la lista de usuarios en caso de error
          }
        );
      } else {
        // Si no es un número, buscar por nombre
        this.userService.buscarUsuarioPorNombreONumberDoc(this.searchTerm, undefined).subscribe(
          (data) => {
            if (data && data.length > 0) {
              this.users = data; // Actualizar la lista de usuarios si hay resultados
            }
          },
          (error) => {
            console.error('Error al buscar usuario:', error);
            Swal.fire(
              'No se encontró coincidencia',
              `El usuario con nombre "${this.searchTerm}" no fue encontrado`,
              'warning'
            );
            this.users = []; // Limpiar la lista de usuarios en caso de error
          }
        );
      }
    } else {
      // Si el campo de búsqueda está vacío, recargar la lista completa de usuarios
      this.userService.obtenerListaDeUsuarios().subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          console.error('Error al cargar la lista de usuarios:', error);
          Swal.fire(
            'Error',
            'Ocurrió un error al cargar la lista de usuarios.',
            'error'
          );
        }
      );
    }
  }
  
}
