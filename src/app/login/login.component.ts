import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);

        if (response === 'Login successful') {
          this.router.navigate(['/lista-services']);
        } else {
          this.error = response;
        }
      },
      error => {
        console.error('Error al iniciar sesión: ', error);
        this.error = 'Error al iniciar sesión. Por favor, revisa tus credenciales.';
      }
    );
  }
}
