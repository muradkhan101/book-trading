import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TradeManagementService } from './trade-management.service';
import { Trade } from './trade';
import { AlertService } from '../alert/alert.service';

import { slideInDownAnimation } from '../app/animations';

@Component({
  selector: 'trades',
  template: `
    <div ngClass='container-fluid'>
      <h1 ngClass='card-title'> {{title || "Open Trades"}} </h1>
      <div *ngIf="trades" ngClass='row'>
        <trade-view *ngFor="let t of trades" [trade]="t"></trade-view>
      </div>
    </div>
  `,
  animations: [slideInDownAnimation]
})

export class TradesComponent {
  @Input() title : string;
  @Input() bookId : string;
  trades : Trade[];

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  
  constructor(
    public manageTrade : TradeManagementService,
    public alert : AlertService
  ) {}

  ngOnInit() {
    if (this.bookId) return this.manageTrade.getForBook(this.bookId).subscribe(trades => this.trades = trades)
    this.manageTrade.getAll().subscribe(trades => this.trades = trades)
  }
}
