import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
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
}
