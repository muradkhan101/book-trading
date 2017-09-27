import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { UserInfoService } from './user-info.service';
import { matchInput } from '../assets/password-validation';

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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  providers: [UserInfoService]
})

export class UserInfoComponent {
  editing : boolean = false;
  user : User;
  userForm : FormGroup;

  constructor(private userInfoService : UserInfoService, private fb : FormBuilder) { }

  createForm() : void {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName || '', Validators.required],
      lastName: [this.user.lastName || '', Validators.required],
      email: [this.user.email || '', [Validators.required, Validators.email]],
      password: [this.user.password || '', Validators.required],
      validatePassword: [this.user.password || '', [Validators.required, matchInput('password')]]
    })
  }

  ngOnInit() {
    this.userInfoService.getUser('1').then(user => {
      this.user = user;
      this.createForm();
    })
  }

  onSubmit() {
    //if (this.userForm.valid) doAJAX('endpoint', this.userForm.value, function(){})
  }
}
