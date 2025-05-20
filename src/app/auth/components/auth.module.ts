import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './login/login.component';
import { userRegisterComponent } from './register/user-register/user-register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LoginComponent,
    userRegisterComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
