import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { matchInput } from '../assets/password-validation';
import { UserAuthenticationService } from '../global_services/user-authentication.service';
import { UserManagementService } from './user-management.service';

@Component ({
  selector: 'user-info',
  template: `
  <div ngClass='container-fluid'>
    <div ngClass='row justify-content-center align-items-center'>
      <div ngClass='user-info col-10 col-lg-9'>
        <div ngClass='card'>
          <h1 ngClass='title card-header'>User Profile</h1>
          <div ngClass='card-body'>
            <form *ngIf="userForm" [formGroup]="userForm" (ngSubmit)="onSubmit()">
              <div ngClass='form-group'>
                <label ngClass="form-control-label">First name</label>
                <input *ngIf="editing" ngClass='form-control' type="text" formControlName="firstName">
                <p *ngIf="!editing">{{this.userForm.value.firstName || ''}}</p>
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">Last name</label>
                <input *ngIf="editing" ngClass='form-control' type="text" formControlName="lastName">
                <p *ngIf="!editing">{{this.userForm.value.lastName || ''}}</p>
              </div>
              <div ngClass='form-group'>
                <label ngClass="form-control-label">E-mail</label>
                <input *ngIf="editing" ngClass='form-control' type="email" formControlName="email">
                <p *ngIf="!editing">{{this.userForm.value.email || ''}}</p>
              </div>
              <div *ngIf="editing" ngClass='form-group'>
                <label ngClass="form-control-label">Password</label>
                <input *ngIf="editing" ngClass='form-control' type="password" formControlName="password">
              </div>
              <div *ngIf="editing" ngClass='form-group'>
                <label ngClass="form-control-label">Validate password</label>
                <input *ngIf="editing" ngClass='form-control' type="password" formControlName="validatePassword">
              </div>
              <button ngClass='btn btn-secondary' type="alt" (click)="editing=!editing">{{editing ? 'Cancel' : 'Edit'}}</button>
              <button ngClass='btn btn-primary'*ngIf="editing" type="submit" [disabled]="!userForm.valid">Submit</button>
              <button ngClass='btn btn-danger float-right' type="danger" (click)="userAuth.logout()">Log-out</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})

export class UserInfoComponent {
  editing : boolean = false;
  userForm : FormGroup;
  formData : Object;

  constructor(private userManagement : UserManagementService, private fb : FormBuilder, private userAuth : UserAuthenticationService) { }

  createForm(user) : void {
    this.userForm = this.fb.group({
      firstName: [user.firstName || '', Validators.required],
      lastName: [user.lastName || '', Validators.required],
      email: [user.email || '', [Validators.required, Validators.email]],
      password: [user.password || ''],
      validatePassword: [user.password || '', [matchInput('password')]]
    })
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.createForm(user);
    this.userForm.valueChanges.subscribe(value => this.formData = value);
  }

  onSubmit() {
    let data = Object.assign({}, this.formData);
    if (!data['password']) delete data['password'];
    delete data['validatePassword'];
    data['uuid'] = JSON.parse(localStorage.getItem('currentUser'))['uuid'];
    this.userManagement.update(data);
  }
}
