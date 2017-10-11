import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookshelfComponent } from './bookshelf.component';
import { BookInfoComponent } from './book-info.component';
import { BookLinkComponent } from './book-link.component';
import { BookRoutingModule } from './book-routing.module';
import { LibraryService } from './library.service';

import { KeysPipe } from '../assets/keys.pipe';

@NgModule({
  imports: [
    BookRoutingModule,
    CommonModule
  ],
  declarations: [
    BookshelfComponent,
    BookLinkComponent,
    BookInfoComponent,
    KeysPipe
  ],
  providers: [
    LibraryService
  ]
})

export class BooksModule {}
