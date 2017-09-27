import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchInput } from '../assets/password-validation';

Component({
  selector: 'registration-form',
  template: `
  <div ngClass='container-fluid'>
    <div ngClass='row justify-content-center align-items-center'>
      <div ngClass='user-info container'>
        <div ngClass='row'>
          <div ngClass='col-6 col-lg-4 card'>
            <h1 ngClass='card-header'>Register for an Account</h1>
            <div ngClass='card-body'>
              <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
              <div ngClass='form-group'>
                <label ngClass="form-control-label">First name</label>
                <input *ngIf="editing" ngClass='form-control' type="text" formControlName="firstName">
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">Last name</label>
                <input *ngIf="editing" ngClass='form-control' type="text" formControlName="lastName">
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">E-mail</label>
                <input *ngIf="editing" ngClass='form-control' type="email" formControlName="email">
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">Password</label>
                <input *ngIf="editing" ngClass='form-control' type="password" formControlName="password">
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">Validate password</label>
                <input *ngIf="editing" ngClass='form-control' type="password" formControlName="validatePassword">
              </div>
              <button type="btn btn-primary submit" [disabled]="!loginForm.valid">Register</button>
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

  constructor(private fb : FormBuilder ) {}

  ngOnInit() {
    this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      validatePassword: ['', [Validators.required, matchInput('password')]]
    })
  }
}
