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
  <trade-modal *ngIf="book$ | async as book" [preSelectedBook]="book.uuid"></trade-modal>
  <div ngClass='book-display container' *ngIf="book$ | async as book">
    <div ngClass='row justify-content-center'>
      <div ngClass='col-3'>
        <img [src]="book.image" ngClass='book-cover'>
        <button ngClass="btn btn-primary mt-2" (click)="addToCollection(book.uuid)" data-toggle="modal" data-target="#trade-modal">Add to Collection</button>
        <button ngClass="btn btn-alt mt-2 mb-2" (click)="showModal()">Trade This</button>
      </div>
      <div ngClass='col'>
        <div ngClass="card bg-light">
          <h1 ngClass='card-title'>{{book.title}}</h1>
          <p ngClass='card-text'>{{book.description}}</p>
        </div>
      </div>
    </div>
    <div ngClass='row'>
      <bookshelf title="Trade For This" [list]="book.uuid+'/trades'"></bookshelf>
    </div>
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
      .switchMap((params : ParamMap) => {
        return (this.book$ = this.libraryService.getBook(params.get('uuid')))
      })
  }
  addToCollection(uuid : string) {console.log(uuid);}
  showModal() {}
}
