import { Component, Input } from '@angular/core';
import { Book } from './book';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'book-info',
  template: `
    <div ngClass='book-display'>
        <div ngClass='bootstraprowclass'>
          <img [src]="book.img" ngClass='book-cover'>
          <div ngClass="book-info">
            <h1 ngClass='title'>{{book.title}}</h1>
            <p ngClass='description'>{{book.description}}</p>
          </div>
        </div>
      <bookshelf [title]="Trade For This" [list]="books/book.id"></bookshelf>
    </div>
`
})

export class BookInfoComponent {
  @Input() public book : Book;
}
