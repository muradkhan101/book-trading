import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { slideInDownAnimation } from '../app/animations';

import { Book } from './book';
import { LibraryService } from './library.service';

@Component({
  selector: 'book-info',
  template: `
    <div ngClass='book-display' *ngIf="book$ | async as book">
        <div ngClass='bootstraprowclass'>
          <img [src]="book.img" ngClass='book-cover'>
          <div ngClass="book-info">
            <h1 ngClass='title'>{{book.title}}</h1>
            <p ngClass='description'>{{book.description}}</p>
          </div>
        </div>
      <bookshelf title="Trade For This" [list]="'books/'+book.id"></bookshelf>
    </div>
`,
styles: [`
  book-cover { width: 100px; height: 100px;}
`],
animations: [slideInDownAnimation]
})

export class BookInfoComponent implements OnInit {
  book$ : Observable<Book>;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private libraryService : LibraryService
  ) {}

  ngOnInit() {
    this.book$ = this.route.paramMap
      .switchMap((params : ParamMap) =>{
        return this.libraryService.getBook(+params.get('id'))})
  }
}
