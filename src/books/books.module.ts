import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookshelfComponent } from './bookshelf.component';
import { BookInfoComponent } from './book-info.component';
import { BookLinkComponent } from './book-link.component';
import { BookRoutingModule } from './book-routing.module';
import { LibraryService } from './library.service';
import { BookManagementService } from './book-management.service';

import { TradeModalComponent } from '../trades/trade-modal.component';
import { TradeManagementService } from '../trades/trade-management.service';

import { DirectivesModule } from '../directives/directives.module';

import { ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from '../alert/alert.module';
import { TradesModule } from '../trades/trades.module';

@NgModule({
  imports: [
    BookRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AlertModule,
    DirectivesModule,
    TradesModule
  ],
  declarations: [
    BookshelfComponent,
    BookLinkComponent,
    BookInfoComponent
  ],
  providers: [
    LibraryService,
    TradeManagementService,
    BookManagementService
  ]
})

export class BooksModule {}
