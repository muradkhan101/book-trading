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
import { BookManagementService } from './book-management.service';

import { ModalContentService } from '../modal/modal-content.service';
import { AlertService } from '../alert/alert.service';
import { TradeFormComponent } from '../trades/trade-form.component';

@Component({
  selector: 'book-info',
  template: `
  <div ngClass='book-display container' *ngIf="book$ | async as book">
    <alert></alert>
    <div ngClass='row justify-content-center'>
      <div ngClass='col-3'>
        <img [src]="book.image" ngClass='book-cover'>
        <button *ngIf="!hasBook" ngClass="btn btn-primary mt-2" (click)="addToCollection(book._id)">Add to Collection</button>
        <button *ngIf="hasBook" ngClass="btn btn-danger mt-2" (click)="removeFromCollection(book._id)">Remove from Collection</button>
        <button ngClass="btn btn-alt mt-2 mb-2" (click)="showModal()" data-toggle="modal" data-target="#main-modal">Trade This</button>
      </div>
      <div ngClass='col'>
        <div>
          <h1 ngClass='card-title'>{{book.title}}</h1>
          <p ngClass='card-text'>{{book.description}}</p>
        </div>
      </div>
    </div>
    <div ngClass='row'>
      <trades title="Trade For This" [bookId]="book._id"></trades>
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
  message;
  hasBook : boolean;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private libraryService : LibraryService,
    private bookManagement : BookManagementService,
    public modalService : ModalContentService,
    public alert : AlertService
  ) {}

  ngOnInit() {
    this.book$ = this.route.paramMap
      .switchMap((params : ParamMap) => {
        return (this.book$ = this.libraryService.getBook(params.get('uuid')))
      })
    this.book$.subscribe(b => this.hasBook = this.userHasBook(b._id));
    this.alert.retrieveMessage()
      .subscribe(message => this.message = message);
  }
  // This is bad book management. Should call API to get book list each time.
  // Or account for removal of book and addition of book situation
  // API call is more authoritative since users can't modify data themselves
  userHasBook(_id : string) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return false;
    return (currentUser.books.indexOf(_id) !== -1);
  }

  addToCollection(_id : string) {
    this.bookManagement.addToCollection(_id);
    this.hasBook = !this.hasBook;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.books.push(_id);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
   }
  removeFromCollection(_id : string) {
    this.bookManagement.removeFromCollection(_id);
    this.hasBook = !this.hasBook;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let bookIndex = currentUser.books.indexOf(_id);
    let books = currentUser.books.slice(0, bookIndex).concat(currentUser.books.slice(bookIndex+1));
    currentUser.books = books;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  showModal() {
    if (!this.bookManagement.isAuthenticated()) this.bookManagement.redirect('login');
    this.libraryService.getBooks('main')
      .subscribe( (books) => {
        this.book$.subscribe( data => {
          let modalData = {
            books: books,
            preSelectedBook: data.uuid
          };
          this.modalService.setContent(TradeFormComponent, modalData);
        })
      })
  }
}
