import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

Component({
  selector: 'registration-form',
  template: `
  <div>
    <h1>Register for an Account</h1>
    <div>
      <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
        <div>
          <label> First name </label>
          <input type="text" formControlName="firstName">
        </div>
        <div>
          <label> Last name </label>
          <input type="text" formControlName="lastName">
        </div>
        <div>
          <label> Email </label>
          <input type="email" formControlName="email">
        </div>
        <div>
          <label> Password </label>
          <input type="password" formControlName="password">
        </div>
        <div>
          <label> Check For Typos </label>
          <input type="password" formControlName="validatePassword">
        </div>
        <button type="submit" [disabled]="!registrationForm.valid">Register</button>
      </form>
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
      email: ['', Validators.required],
      password: ['', Validators.required],
      validatePassword: ['', Validators.required]
    })
  }
}
