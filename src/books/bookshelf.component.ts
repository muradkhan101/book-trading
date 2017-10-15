import { Component, OnInit, Input } from '@angular/core';

import { Book } from './book';

import { LibraryService } from './library.service';

@Component({
  selector: 'bookshelf',
  template: `
    <div ngClass='container-fluid'>
      <h1 ngClass='card-title'> {{title || "All Books"}} </h1>
      <div *ngIf="books" ngClass='row'>
        <book-link *ngFor="let b of (books | keys)" [book]="b"></book-link>
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
    this.libraryService.getBooks(this.list).subscribe(b => this.books = b)
  }
}
