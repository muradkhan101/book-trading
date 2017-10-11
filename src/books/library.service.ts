import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Book } from './book';
import { Observable } from 'rxjs';
import * as Constants from '../assets/config';

@Injectable()
export class LibraryService {
  constructor(private http: Http) {}
  bookList : Object = {};

  getBooks(list: string) {
    let l = list || '';
    if (this.bookList[list || 'main']) return Observable.create( obs => {
      obs.next(this.bookList[list || 'main']);
    })
    return this.http.get(`${Constants.baseURL}/books/${l}`, Constants.headers)
      .map((response : Response) => {
        this.bookList[list || 'main'] = {};
        response.json().map( e => this.bookList[list || 'main'][e.uuid] = new Book(e));
        return this.bookList[list || 'main'];
      })
  }
  getBook(uuid : string) : Observable<Book> {
    if (!this.bookList['main']) return this.getBooks('').map(books => books[uuid]);
    return Observable.create( obs => obs.next(this.bookList['main'][uuid]));
  }
}
