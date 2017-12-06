// Input lets parent components pass values down to children (like props in React)
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from './book';

@Component({
  selector: 'book-link',
  template: `
  <div class='col-6 col-md-3 mt-2'>
    <a [routerLink]="['/books', book.uuid]">
      <img src="{{book.image}}" alt="{{book.title}}">
    </a>
  </div>
  `
})

export class BookLinkComponent {
  @Input() book : Book;
  constructor () {}
}
