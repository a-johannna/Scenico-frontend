
import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { LoginRequestDTO } from './dtos/LoginRequestDTO';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {catchError, of, tap} from 'rxjs';
import {userRegisterComponent} from '../register/user-register/user-register.component';

@Component({
  selector: 'app-login',
  templateUrl:'login.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: LoginRequestDTO = { username: '', password: '' };
  error: string | null = null;
  isLoading = false; // Declarar e inicializar isLoading

  constructor(private authService: AuthService, private router: Router) {

    console.log('LoginComponent');
  }

   createUser() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    this.router.navigate(['/reset-password']);
  }

  onSubmit(): void {
    this.isLoading = true; // Iniciar la indicación de carga
    this.error = null; // Limpiar cualquier error anterior
    this.authService.login(this.user).pipe(
      tap(response => localStorage.setItem('token', response.token)),
      catchError(err => {
        this.error = 'Error al iniciar sesión: ' + err?.message || 'Error desconocido'; // Manejo de errores mejorado
        console.error('Error al iniciar sesión:', err);
        return of(null); // Devolver un valor para que el observable complete
      })
    )
  }


  protected readonly userRegisterComponent = userRegisterComponent;
}
