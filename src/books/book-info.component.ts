// HostBinding binds certain style, attributes, etc to given item
// OnInit -> componentDidMount, OnDestroy -> componentWillUnmount
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
// ActivatedRoute is an observable of each navigation. Has info about current path, last path, nav path
// ParamMap makes it easier to work with things with multiple keys/parameters
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// SwitchMap flattens the paramMap into an easier to work with ParamMap (yes the difference is the capital)
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
