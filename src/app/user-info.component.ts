import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { UserInfoService } from './user-info.service';

@Component ({
  selector: 'user-info',
  template: `
    <div ngClass='user-info'>
      <h1 class='title'>User Profile</h1>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div>
          <label>Username: </label>
          <input *ngIf="editing" type="text" formControlName="name">
          <p *ngIf="!editing"></p>
        </div>
        <div>
          <label>E-mail: </label>
          <input *ngIf="editing" type="email" formControlName="email">
          <p *ngIf="!editing"></p>
        </div>
        <button type="alt" (ngClick)="editing=!editing">Edit / Cancel</button>
        <button *ngIf="editing" type="submit" [disabled]="!userForm.valid">Submit</button>
      </form>
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
      name: [this.user.name || '', Validators.required],
      email: [this.user.email || '', Validators.required]
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
