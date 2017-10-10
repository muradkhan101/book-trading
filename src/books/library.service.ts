import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Book } from './book';
import { Observable } from 'rxjs';
import * as Constants from '../assets/config';

@Injectable()
export class LibraryService {
  constructor(private http: Http) {}
  bookList : Object = {};
  lastList : string;
  getBooks(list : string = '') {
    this.lastList = list || 'main';
    if (this.bookList[list || 'main']) return Observable.create( obs => {
      obs.next(this.bookList[list || 'main']);
    })
    return this.http.get(`${Constants.baseURL}/books/${list}`, Constants.headers)
      .map((response : Response) => {
        this.bookList[list || 'main'] = response.json().map((e, i) => new Book(e, i));
        return this.bookList[list || 'main'];
      })
  }
  getBook(id : number) : Observable<Book> {
    return Observable.create( obs => obs.next(this.bookList[this.lastList][id]));
  }
}
