import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-user.component.html',
  styleUrl: './crear-user.component.css'
})
export class CrearUserComponent implements OnInit{

  user: User = new User();

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  guardarUser(){
    this.userService.crearUsuario(this.user).subscribe(dato => {
      console.log(dato);
      this.iralaListadeUsuarios();
    }, error => console.log(error));
  }

  iralaListadeUsuarios(){
    this.router.navigate(["/users"])
  }

  onSubmit() {
    this.guardarUser();
  }


  restrictInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const maxLength = this.user.documentType === 'DNI' ? 8 : 20;
    if (input.value.length >= maxLength) {
      event.preventDefault();
    }
  }

  
}
