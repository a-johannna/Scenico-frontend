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
      rol: [RolUsuario.USUARIO_NORMAL, Validators.required],
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

/*
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const createUserDTO: CreateUserDTO = this.registerForm.value;

    this.authService.register(createUserDTO).subscribe({
      next: res => {
        this.errorMessages = [];
        this.successMessage =  `¡Usuario ${res.username} registrado correctamente!`;
        this.router.navigate(['/login']);  // redireccionar al perfil del usuario
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

 */

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedImage = input.files[0];
      // si luego quieres subir la imagen, aquí puedes gestionarla
    }
  }
}


/*export class userRegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  user = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    location: '',
    rol: '',
    imagen: null as File | null
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastName: ['', [Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', ],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]
      ],
      photoProfile: ['', [Validators.pattern("^(http|https)://.*")]
      ],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      rol: ['ESPECTADOR', [Validators.required]]
    });

  }


  errorMessages: string[] = [];


  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const createUserDTO: CreateUserDTO = this.registerForm.value;

    this.authService.register(createUserDTO).subscribe({
      next: (res) => {
        this.errorMessages = [];
        console.log('Usuario registrado correctamente: ', res);

        this.router.navigate(['/login']).then((navigated) => {
          if (navigated) {
            console.log('Redireccionado a login');
          }
        });
      },
      error: (errors: string[]) => {
        this.errorMessages = errors;
      }
    });
  }


  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target?.files?.length) {
      this.user.imagen = target.files[0];
    }
  }


}*/
