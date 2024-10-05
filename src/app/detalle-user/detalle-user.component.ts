import { Component } from '@angular/core';
import { User } from '../user/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-user',
  standalone: true,
  imports: [],
  templateUrl: './detalle-user.component.html',
  styleUrl: './detalle-user.component.css'
})
export class DetalleUserComponent {

  id: number;
  user: User;
  constructor(private route: ActivatedRoute, private userServicie: UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.user = new User();
    this.userServicie.obtenerUsuarioPorId(this.id).subscribe(dato => {
      this.user = dato;
      Swal.fire(`Detalles del usuario ${this.user.name}`);
    });
  }
}
