import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {CreateUserDTO, RolUsuario} from './dtos/CreateUserDTO';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    NgClass,
    NgForOf,

  ]


})

export class userRegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];
  successMessage: string = '';
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: [RolUsuario.USER, Validators.required],
      location: [''],
      description: [''],
      photoProfile: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log("Formulario inválido:", this.registerForm.value);
      return;
    }

    const createUserDTO: CreateUserDTO = this.registerForm.value;

    this.authService.register(createUserDTO).subscribe({
      next: res => {
        this.errorMessages = [];
        this.successMessage =  `¡Usuario ${res.username} registrado correctamente!`;

        // Guardar el token (si viene en la respuesta)
        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        // Obtener UUID desde el token y redirigir al perfil
        const uuid = this.authService.getCurrentUserUuid();
        if (uuid) {
          this.router.navigate([`/uuid/${uuid}`]);
        } else {
          console.warn('UUID no encontrado en el token');
        }
      },

      error: (errors: any) => {
        if (errors.status === 400) {
          this.errorMessages = errors.error?.errors || ['Solicitud malformada'];
        } else if (errors.status === 500) {
          this.errorMessages = ['Error interno del servidor. Intenta más tarde.'];
        } else {
          this.errorMessages = ['Error desconocido'];
        }
      }
    });
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedImage = input.files[0];

    }
  }
}


