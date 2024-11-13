import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Service } from '../../../shared/models/service';
import { ServiceService } from '../../../core/service/service.service';

@Component({
  selector: 'app-lista-users',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.css'],
})
export class ListaUsersComponent implements OnInit {
  users: User[] = [];
  services: Service[] = [];
  searchTerm: string = ''; // Usar una sola variable para la búsqueda
  searchTerm1: string = ''; // Usar una sola variable para la búsqueda

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerService();
    this.obtenerUser();
  }

  actualizarUser(id: number) {
    this.router.navigate(['actualizar-user', id]); // Navegación
  }

  eliminarUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarUsuario(id).subscribe(
          (dato) => {
            console.log(dato);
            this.ngOnInit(); // Recarga la lista de usuarios
            Swal.fire(
              'Usuario eliminado',
              'El usuario ha sido eliminado con éxito',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error',
              'Hubo un error al intentar eliminar el usuario',
              'error'
            );
          }
        );
      }
    });
  }

  detalleUser(id: number) {
    this.router.navigate(['detalle-user', id]);
  }

  private obtenerUser(): void {
    this.userService.obtenerListaDeUsuarios().subscribe((dato) => {
      this.users = dato;
    });
  }

  buscarUsuarioporNombreoNro(): void {
    if (this.searchTerm.trim() !== '') {
      const isNumber = /^\d+$/.test(this.searchTerm); // Verifica si es un número

      if (isNumber) {
        // Si es un número, buscar por número de documento
        this.userService
          .buscarUsuarioPorNombreONumberDoc(undefined, +this.searchTerm)
          .subscribe(
            (data) => {
              if (data && data.length > 0) {
                this.users = data; // Actualizar la lista de usuarios si hay resultados
              }
            },
            (error) => {
              console.error('Error al buscar usuario:', error);
              Swal.fire(
                'No se encontró coincidencia',
                `El usuario con número de documento "${this.searchTerm}" no fue encontrado`,
                'error'
              );
              this.obtenerUser(); // Recargar la lista completa de usuarios en caso de error
            }
          );
      } else {
        // Si no es un número, buscar por nombre
        this.userService
          .buscarUsuarioPorNombreONumberDoc(this.searchTerm, undefined)
          .subscribe(
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
                'error'
              );
              this.obtenerUser(); // Recargar la lista completa de usuarios en caso de error
            }
          );
      }
    } else {
      // Si el campo de búsqueda está vacío, recargar la lista completa de usuarios
      this.obtenerUser();
    }
  }

  actualizarService(id: number) {
    this.router.navigate(['actualizar-service', id]);
  }

  private obtenerService(): void {
    this.serviceService.obtenerListaDeServicios().subscribe((dato) => {
      this.services = dato;
    });
  }

  eliminarService(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al servicio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.eliminarServicio(id).subscribe((dato) => {
          console.log(dato);
          this.obtenerService();
          Swal.fire(
            'Servicio eliminado',
            'El servicio ha sido eliminado con éxito',
            'success'
          );
        });
      }
    });
  }

  detalleService(id: number) {
    this.router.navigate(['detalle-service', id]);
  }

  buscarServicePorNombre(): void {
    const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(this.searchTerm1)) {
      Swal.fire(
        'Entrada no válida',
        'Por favor, ingresa solo letras en el campo de búsqueda',
        'error'
      );
      return;
    }

    if (this.searchTerm1.trim() !== '') {
      this.serviceService.obtenerServicioPorName(this.searchTerm1).subscribe(
        (service) => {
          this.services = [service];
        },
        (error) => {
          Swal.fire(
            'No se encontró coincidencia',
            `El servicio con el nombre "${this.searchTerm1}" no fue encontrado`,
            'error'
          );
          this.obtenerService();
        }
      );
    } else {
      this.obtenerService();
    }
  }
}
