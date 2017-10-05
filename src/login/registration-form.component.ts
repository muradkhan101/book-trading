import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchInput } from '../assets/password-validation';
import { UserManagementService } from '../user/user-management.service';

@Component({
  selector: 'registration-form',
  template: `
  <div ngClass='container-fluid'>
    <div ngClass='row justify-content-center align-items-center'>
      <div ngClass='user-info container'>
        <div ngClass='row'>
          <div ngClass='no-padding col-6 col-lg-4 card'>
            <h1 ngClass='card-header'>Register for an Account</h1>
            <div ngClass='card-body'>
              <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
              <div ngClass='form-group'>
                <label ngClass="form-control-label">First name</label>
                <input ngClass='form-control' type="text" formControlName="firstName">
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">Last name</label>
                <input ngClass='form-control' type="text" formControlName="lastName">
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">E-mail</label>
                <input ngClass='form-control' type="email" formControlName="email">
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">Password</label>
                <input ngClass='form-control' type="password" formControlName="password">
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">Validate password</label>
                <input ngClass='form-control' type="password" formControlName="validatePassword">
              </div>
              <button type="submit" ngClass="btn btn-primary submit" [disabled]="!registrationForm.valid">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})

export class RegistrationFormComponent {
  registrationForm : FormGroup;
  formData : Object;

  constructor(private fb : FormBuilder, private manageUser : UserManagementService ) {this.createForm();}

  createForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      validatePassword: ['', [Validators.required, matchInput('password')]]
    })
  }

  ngOnInit() {
    this.registrationForm.valueChanges.subscribe( value => {this.formData = value;})
  }

  onSubmit() {
    this.manageUser.create(this.formData);
  }
}
