import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { UserManagementService } from '../user/user-management.service';
import { RegistrationFormComponent } from './registration-form.component';
import { UserAuthenticationService } from '../global_services/user-authentication.service';

import { AlertService } from '../alert/alert.service';
import { AlertComponent } from '../alert/alert.component';

@NgModule({
  imports : [
    LoginRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations : [
    LoginFormComponent,
    RegistrationFormComponent,
    AlertComponent
  ],
  providers : [
    UserAuthenticationService,
    UserManagementService,
    AlertService
  ]
})

export class LoginModule {}
