// Input lets parent components pass values down to children (like props in React)
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from './book';
import { UserInfoService } from '../user/user-info.service';

@Component({
  selector: 'book-link',
  template: `
  <div ngClass='col-6 col-md-3'>
    <a [routerLink]="['/books', book.id]">
      <div ngClass="book-cover" [ngStyle]="{'background-image': 'url(https://source.unsplash.com/featured)' }">
      </div>
    </a>
  </div>
  `,
  styles: [`
    .book-cover {width: 200px; height: 200px;}`]
})

export class BookLinkComponent {
  @Input() book : Book;
  constructor (userService : UserInfoService) {}
}
