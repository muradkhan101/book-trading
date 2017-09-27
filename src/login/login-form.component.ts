import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  template: `
  <div ngClass='container-fluid'>
    <div ngClass='row justify-content-center align-items-center'>
      <div ngClass='user-info container'>
        <div ngClass='row'>
          <div ngClass='col-6 col-lg-4 card'>
            <h1 ngClass='card-header'>Login</h1>
            <div ngClass='card-body'>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div ngClass='form-group'>
                <label ngClass='form-control-label'> Email </label>
                <input type="email" formControlName="email">
              </div>
              <div>
                <label ngClass='form-control-label'> Password </label>
                <input type="password" formControlName="password">
              </div>
              <button type="btn btn-primary submit" [disabled]="!loginForm.valid">Log-in</button>
              </form>
            </div>
            <hr ngClass="my-4">
            <div ngClass='alert alert-light' role='alert'> If you don't have an account, you can <a ngClass='alert-link' routerLink="register">register here</a></p>
          </div>
        </div>
      </div>
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
    this.loginForm.valueChanges.subscribe(value => {

    })
  }

}
