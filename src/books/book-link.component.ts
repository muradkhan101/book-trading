import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from './book';
import { UserInfoService } from '../user/user-info.service';

@Component({
  selector: 'book-link',
  template: `
  <a [routerLink]="['/books', book.id]">
    <div ngClass="book-cover" [ngStyle]="{'background-image': 'url(https://source.unsplash.com/featured)' }">
    </div>
  </a>
  `,
  styles: [`
    .book-cover {width: 200px; height: 200px;}`]
})

export class BookLinkComponent {
  @Input() book : Book;
  constructor (userService : UserInfoService) {}
}
