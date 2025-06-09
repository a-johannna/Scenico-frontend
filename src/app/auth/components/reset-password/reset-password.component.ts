import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./reset-register.component.css']
})
export class ResetPasswordComponent {
  form: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const email = this.form.value.email;


      this.message = `Se ha enviado un enlace a ${email} si existe en nuestra base de datos.`;
      this.error = null;
    } else {
      this.message = null;
      this.error = 'Por favor, introduce un correo electrónico válido.';
    }
  }
}
