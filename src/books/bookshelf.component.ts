import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { Book } from './book';

import { LibraryService } from './library.service';

import { slideInDownAnimation } from '../app/animations';

@Component({
  selector: 'bookshelf',
  template: `
    <div ngClass='container-fluid'>
      <h1 ngClass='card-title'> {{title || "All Books"}} </h1>
      <div *ngIf="books" ngClass='row'>
        <book-link *ngFor="let b of (books | keys)" [book]="b"></book-link>
      </div>
    </div>
  `,
  animations: [slideInDownAnimation]
})

export class BookshelfComponent implements OnInit {
  public books : Book[] ;
  @Input() title : string;
  @Input() list : string;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  
  constructor(private libraryService : LibraryService) {}
  ngOnInit() : void {
    this.libraryService.getBooks(this.list).subscribe(b => this.books = b)
  }
}
