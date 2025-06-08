import { Routes } from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {userRegisterComponent} from './auth/components/register/user-register/user-register.component';
import {ResetPasswordComponent} from './auth/components/reset-password/reset-password.component';
import {UserProfileComponent} from './auth/components/register/user-profile/user-profile.component';
import {ExplorarPortafoliosComponent} from './auth/components/explorar-portafolios/explorar-portafolios.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: userRegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'uuid/:uuid', component: UserProfileComponent },
  { path: 'explorar', component: ExplorarPortafoliosComponent }


];
