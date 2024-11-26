import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Respuesta completa del servidor:', response); // Verifica los datos de la respuesta

        if (response.message === 'Login successful') {
          const userRole = response.role;
          const userModuleId = response.moduleId;
          const userId = response.id; // Obtiene el ID del usuario
          const userName = response.name; // Obtiene el nombre del usuario

          // Almacena la información en el localStorage solo si está disponible
          localStorage.setItem(
            'loggedUser',
            JSON.stringify({
              userId: userId || '', // Si no hay ID, almacena cadena vacía
              name: userName || '', // Si no hay nombre, almacena cadena vacía
              username: response.username || '',
              moduleId: userModuleId,
              role: userRole,
            })
          );

          console.log('Datos almacenados en localStorage:', {
            userId: userId,
            name: userName,
            moduleId: userModuleId,
            role: userRole,
          });

          // Redirigir solo a /nqc si el rol es ADVISER
          if (userRole === 'ADVISER') {
            console.log('Redirigiendo a /nqc');
            this.router.navigate(['/nqc']);
          }
        } else {
          this.error = response.message; // Manejo de error
        }
      },
      (error) => {
        console.error('Error al iniciar sesión: ', error);
        this.error =
          'Error al iniciar sesión. Por favor, revisa tus credenciales.';
      }
    );
  }
}
