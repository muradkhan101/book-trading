import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  `
})

export class UserInfoComponent {
  editing : boolean = false;
  userForm : FormGroup;

  constructor(private fb : FormBuilder) {
    this.createForm();
  }
  
  createForm() : void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }
}
