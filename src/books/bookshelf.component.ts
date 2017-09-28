import { Component, OnInit, Input } from '@angular/core';

import { Book } from './book';

import { LibraryService } from './library.service';

@Component({
  selector: 'bookshelf',
  template: `
    <div ngClass='card container-fluid'>
      <h1 ngClass='card-title'> {{title}} </h1>
      <div ngClass='row'>
        <book-link *ngFor="let b of books" [book]="b"></book-link>
      </div>
    </div>
  `
})

export class BookshelfComponent implements OnInit {
  public books : Book[] ;
  @Input() title : string;
  @Input() list : string;
  constructor(private libraryService : LibraryService) {}
  ngOnInit() : void {
    this.libraryService.getBooks(this.list).then(b => this.books = b)
  }
}
