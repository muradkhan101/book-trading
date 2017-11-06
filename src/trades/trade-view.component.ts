import { Component, OnInit, Input } from '@angular/core';
import { TradeManagementService } from './trade-management.service';
import { Trade } from './trade';
import { ModalContentService } from '../modal/modal-content.service';
import { TradeAcceptComponent } from '../trades/trade-accept.component';
import { LibraryService } from '../books/library.service';
import { UserAuthenticationService } from '../global_services/user-authentication.service';

@Component({
  selector: 'trade-view',
  template: `
  <div ngClass="container-fluid trade">
    <div ngClass="row justify-content-center">
      <div ngClass='col-12 col-md-6 mt-2 align-items-center'>
        <div ngClass="offerBook">
          <img src="{{trade.offerBook.image}}" alt="{{trade.offerBook.title}}">
        </div>
        <div *ngIf="trade.wantBook" ngClass="wantBook">
          <img src="{{trade.wantBook.image}}" alt="{{trade.wantBook.title}}">
        </div>
      </div>
    </div>
    <div ngClass="row justify-content-center">
      <div ngClass='col-12 col-md-6'>
        <button ngClass="btn btn-primary mt-2 mb-2" (click)="showModal()" data-toggle="modal">Offer Trade</button>
      </div>
    </div>
  </div>
  `
})

export class TradeViewComponent {
  @Input() trade : Trade;
  constructor(
    public modalService : ModalContentService,
    public libraryService : LibraryService,
    public userAuthentication : UserAuthenticationService
  ) {}

  showModal() {
    if (!this.userAuthentication.isAuthenticated()) return this.userAuthentication.redirect('login');
    eval('$("#main-modal").modal("show")');
    this.libraryService.getBooks('')
      .subscribe( (books) => {
        let data = {
          trade: this.trade,
          books: books
        }
        this.modalService.setContent(TradeAcceptComponent, data);
      })
  }
}
