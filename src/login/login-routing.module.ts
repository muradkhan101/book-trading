import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form.component';
import { RegistrationFormComponent } from './registration-form.component';

const loginRoutes : Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegistrationFormComponent}
]

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})

export class LoginRoutingModule {}
