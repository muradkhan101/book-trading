import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { TradeManagementService } from '../trades/trade-management.service';

@Component({
  template: `
  <div ngClass="modal-header">
    <h2>Add a trade</h2>
    <button ngClass="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div ngClass="modal-body">
    <form [formGroup]="tradeForm" (ngSubmit)="onSubmit()">
    <alert></alert>
      <div ngClass="form-group">
        <label ngClass="col-form-label">Trade This: </label>
        <select ngClass="custom-select" formControlName="offerBook">
          <option *ngIf="data.preSelectedBook" [ngValue]="data.books[data.preSelectedBook]._id" selected>{{data.books[data.preSelectedBook].title}}</option>
          <ng-container *ngIf="!data.preSelectedBook">
            <option *ngFor="let b of (data.books | keys)" [ngValue]="b._id">{{b.title}}</option>
          </ng-container>
        </select>
      </div>
      <div ngClass="form-group">
        <label ngClass="col-form-label">Want something?</label>
        <select ngClass="custom-select" formControlName="wantBook">
          <option selected ngValue="null">Suprise me!</option>
          <option *ngFor="let b of (data.books | keys)" [ngValue]="b._id">{{b.title}}</option>
        </select>
      </div>
      <button type="submit" ngClass="btn btn-primary" [disabled]="!tradeForm.valid">Submit Trade</button>
    </form>
  </div>
  <div ngClass="modal-footer">
    <button ngClass="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancel</button>
  </div>
  `
})

export class TradeFormComponent {
  @Input() data : any;

  tradeForm : FormGroup;
  formData;

  constructor(private fb : FormBuilder,
              private alert : AlertService,
              private trades : TradeManagementService
              ) {}
  createForm() {
    this.tradeForm = this.fb.group({
      offerBook : [ this.data.books[this.data.preSelectedBook]._id || '', Validators.required ],
      wantBook  : [ '' ],
      from      : [ JSON.parse(localStorage.getItem('currentUser'))._id, Validators.required ]
    })
  }
  ngOnInit() {
    this.createForm();
    this.tradeForm.valueChanges.subscribe(value => this.formData = value);
  }

  onSubmit() {
    let data = Object.assign({}, this.formData);
    if (!data.wantBook) delete data['wantBook'];
    this.trades.create(data);
  }
}
