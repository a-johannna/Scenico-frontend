import {Component, OnInit} from '@angular/core';
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
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      rol: 'USUARIO_NORMAL'
    };
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
