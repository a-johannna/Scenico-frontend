import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {CreateUserDTO} from './dtos/CreateUserDTO';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ]


})
export class userRegisterComponent {
  registerForm: FormGroup;
  submitted = false;

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
    });

  }



  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const createUserDTO: CreateUserDTO = this.registerForm.value;
    this.authService.register(createUserDTO).subscribe({
      next: () => {
        console.log('Usuario registrado correctamente');
        this.router.navigate(['/login']).then(r => {
          if (r) {
            console.log('Redireccionado a login');
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
      }
    });
  }
}
