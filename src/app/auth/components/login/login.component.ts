
import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { LoginRequestDTO } from './dtos/LoginRequestDTO';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {catchError, of, tap} from 'rxjs';
import {userRegisterComponent} from '../register/user-register/user-register.component';
import {LoginResponseDTO} from './dtos/LoginResponseDTO';

@Component({
  selector: 'app-login',
  templateUrl:'login.component.html',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    NgForOf
  ],
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessages = [];

    if (this.loginForm.invalid) return;

    const credentials: LoginRequestDTO = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res: LoginResponseDTO) => {
        if (res.token) {
          localStorage.setItem('token', res.token);

          const uuid = this.authService.getCurrentUserUuid();
          if (uuid) {
            this.router.navigate([`/uuid/${uuid}`]);
          } else {
            this.errorMessages.push('No se pudo identificar al usuario.');
          }
        } else {
          this.errorMessages.push('No se recibió el token.');
        }
      },
      error: (err: any) => {
        this.errorMessages = Array.isArray(err)
          ? err
          : ['Error inesperado al iniciar sesión'];
        console.error('Error en login:', err);
      }
    });
  }
  createUser() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    this.router.navigate(['/reset-password']);
  }
}
