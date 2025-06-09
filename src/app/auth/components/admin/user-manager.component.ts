import {Component, numberAttribute, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Usuario} from '../../models/usuario';
import {UserService} from '../../services/UserService';



@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ]
})

export class userManagerComponent implements OnInit {

  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = this.resetUsuario();
  editando: boolean = false;
  usuarioEditandoUuid: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // Cargar lista
  cargarUsuarios(): void {
    this.userService.getAllUsers().subscribe({
      next: data => this.usuarios = data,
      error: err => console.error('Error al cargar usuarios', err)
    });
  }

  // Crear nuevo
  registrarUsuario(): void {
    this.userService.createUser(this.nuevoUsuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.nuevoUsuario = this.resetUsuario();
      },
      error: err => console.error('Error al crear usuario', err)
    });
  }

  // Eliminar
  eliminarUsuario(uuid: string): void {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.userService.deleteUser(uuid).subscribe({
        next: () => this.cargarUsuarios(),
        error: err => console.error('Error al eliminar usuario', err)
      });
    }
  }

  // Preparar edición
  editarUsuario(usuario: Usuario): void {
    this.nuevoUsuario = { ...usuario }; // Clonar datos
    this.editando = true;
    this.usuarioEditandoUuid = usuario.uuid!;
  }

  // Confirmar edición
  actualizarUsuario(): void {
    this.userService.updateUser(this.usuarioEditandoUuid, this.nuevoUsuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cancelarEdicion();
      },
      error: err => console.error('Error al actualizar usuario', err)
    });
  }

  // Cancelar edición
  cancelarEdicion(): void {
    this.editando = false;
    this.usuarioEditandoUuid = '';
    this.nuevoUsuario = this.resetUsuario();
  }

  private resetUsuario(): Usuario {
    return {
      id_user: number,
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      typeUser: 'USER'
    };
  }



}
