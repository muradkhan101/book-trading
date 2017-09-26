import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  template: `
  <div>
    <h1>Login</h1>
    <div>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div>
        <label> Email </label>
        <input type="email" formControlName="email">
      </div>
      <div>
        <label> Password </label>
        <input type="password" formControlName="password">
      </div>
      <button type="submit" [disabled]="!loginForm.valid">Log-in</button>
      </form>
    </div>
    <div ngClass="'horizontal-separator'">
      <p> If you don't have an account, you can <a routerLink="register">register here</a></p>
    </div>
  </div>
  `
})

export class LoginFormComponent {
  loginForm : FormGroup;

  // Remember to declare these injections as private or no access with this
  constructor(private fb : FormBuilder) { }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.createForm();
  }
}
