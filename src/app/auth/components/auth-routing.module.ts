import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// @ts-ignore
import {ResetRegisterComponent} from "./reset-password/reset-register.component";


const routes: Routes = [
  { path: 'reset-password', component: ResetRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
