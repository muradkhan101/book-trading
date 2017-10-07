import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAuthenticationService } from '../global_services/user-authentication.service';

@Component({
  selector: 'login-page',
  template: `
  <div ngClass='container-fluid'>
    <div ngClass='row justify-content-center align-items-center'>
      <div ngClass='user-info container'>
        <div ngClass='row'>
          <div ngClass='no-padding col-6 col-lg-4 card'>
            <h1 ngClass='card-header'>Login</h1>
            <div ngClass='card-body'>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div ngClass='form-group'>
                <label ngClass='col-form-label'> Email </label>
                <input type="email" ngClass="form-control" formControlName="email" placeholder="Enter email">
              </div>
              <div>
                <label ngClass='form-control-label'> Password </label>
                <input type="password" ngClass="form-control mb-3" formControlName="password" placeholder="Password">
              </div>
              <button type="submit" ngClass="btn btn-primary submit" [disabled]="!loginForm.valid">Log-in</button>
              </form>
            </div>
            <hr ngClass="my-4">
            <div ngClass='alert alert-light' role='alert'> If you don't have an account, you can <a ngClass='alert-link' routerLink="/register">register here</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})

export class LoginFormComponent {
  loginForm : FormGroup;
  formData;
  // Remember to declare these injections as private or no access with this
  constructor(private fb : FormBuilder, private userAuth : UserAuthenticationService) { }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.createForm();
    this.loginForm.valueChanges.subscribe(value => { this.formData = value; })
  }

  onSubmit() {
    this.userAuth.login(this.formData);
  }
}
