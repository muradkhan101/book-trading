import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { TradeManagementService } from './trade-management.service';
import { Book } from '../books/book';
import { LibraryService } from '../books/library.service';

@Component({
  selector : 'trade-modal',
  template: `
  <div ngClass="modal fade" id="trade-modal">
    <div ngClass="modal-dialog" role="document">
      <div ngClass="modal-content">
        <div ngClass="modal-header">
          <h2>Add a trade</h2>
          <button ngClass="close" data-dismiss="model" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div ngClass="modal-body">
          <form [formGroup]="tradeForm" (ngSubmit)="onSubmit()">
          <alert></alert>
            <div ngClass="form-group">
              <label ngClass="col-form-label">Trade This: </label>
              <select ngClass="custom-select" formControlName="offerBook">
                <option *ngIf="preSelectedBook" value="books[preSelectedBook].uuid" selected disabled>{{books[preSelectedBook].title}}</option>
                <ng-container *ngIf="!preSelectedBook">
                  <option *ngFor="let b of (books | keys)" ngValue="b.uuid">{{b.title}}</option>
                </ng-container>
              </select>
            </div>
            <div ngClass="form-group">
              <label ngClass="col-form-label">Want something?</label>
              <select ngClass="custom-select" formControlName="wantBook">
                <option selected>Suprise me!</option>
                <option *ngFor="let b of (books | keys)" ngValue="b.uuid">{{b.title}}</option>
              </select>
            </div>
            <button type="submit" ngClass="btn btn-primary" [disabled]="!tradeForm.valid">Submit Trade</button>
          </form>
        </div>
        <div ngClass="modal-footer">
          <button ngClass="btn btn-primary">Add trade</button>
          <button ngClass="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  `
})
export class TradeModalComponent {
  tradeForm : FormGroup;
  formData;
  books;
  @Input() preSelectedBook : string;

  constructor(private fb : FormBuilder,
              private alert : AlertService,
              private trades : TradeManagementService,
              private library : LibraryService
              ) {}
  createForm() {
    this.tradeForm = this.fb.group({
      offerBook : [ this.preSelectedBook || '', Validators.required ],
      wantBook  : [ '', Validators.required ],
      from      : [ JSON.parse(localStorage.getItem('currentUser')).uuid, Validators.required ]
    })
  }
  ngOnInit() {
    console.log(this.preSelectedBook);
    this.library.getBooks('main').subscribe(b => this.books = b);
    this.createForm();
    this.tradeForm.valueChanges.subscribe(value => this.formData = value);
  }

  onSubmit() {
    console.log(this.formData);
    this.trades.create(this.formData);
  }
}
