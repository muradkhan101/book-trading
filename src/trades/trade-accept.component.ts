import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { TradeManagementService } from '../trades/trade-management.service';

@Component({
  template: `
  <div ngClass="modal-header">
    <h2>Complete a Trade</h2>
    <button ngClass="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div ngClass="modal-body">
    <form [formGroup]="tradeAcceptForm" (ngSubmit)="onSubmit()">
    <alert></alert>
      <div ngClass="form-group">
        <label ngClass="col-form-label">Trading For: </label>
        <select ngClass="custom-select" formControlName="offerBook">
          <option selected [ngValue]="data.trade.offerBook._id">{{data.trade.offerBook.title}}</option>
        </select>
      </div>
      <div ngClass="form-group">
        <label ngClass="col-form-label">Your offer:</label>
        <select ngClass="custom-select" formControlName="wantBook">
          <option *ngIf="data.trade.wantBook" selected [ngValue]="data.trade.wantBook._id">{{data.trade.wantBook.title}}</option>
          <option *ngFor="let b of (data.books | keys)" [ngValue]="b._id">{{b.title}}</option>
        </select>
      </div>
      <button type="submit" ngClass="btn btn-primary" [disabled]="!tradeAcceptForm.valid">Accept Trade</button>
    </form>
  </div>
  <div ngClass="modal-footer">
    <button ngClass="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancel</button>
  </div>
  `
})

export class TradeAcceptComponent {
  @Input() data : any;

  tradeAcceptForm : FormGroup;
  formData;

  constructor(private fb : FormBuilder,
              private alert : AlertService,
              private trades : TradeManagementService
              ) {}
  createForm() {
    this.tradeAcceptForm = this.fb.group({
      offerBook : [ this.data.trade.offerBook._id || '', Validators.required ],
      wantBook  : [ this.data.trade.wantBook._id || '', Validators.required ],
      with      : [ JSON.parse(localStorage.getItem('currentUser'))._id || '', Validators.required ],
      status    : ["Closed"],
      uuid      : [this.data.trade.uuid || '']
    })
  }
  ngOnInit() {
    console.log(this.data);
    if (!this.trades.isAuthenticated()) {this.trades.redirect('/login')}
    this.createForm();
    this.tradeAcceptForm.valueChanges.subscribe(value => this.formData = value);
  }

  onSubmit() {
    let data = Object.assign({}, this.formData);
    this.trades.update(data);
  }
}
