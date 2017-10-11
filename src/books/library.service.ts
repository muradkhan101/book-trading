import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Book } from './book';
import { Observable } from 'rxjs';
import * as Constants from '../assets/config';

@Injectable()
export class LibraryService {
  constructor(private http: Http) {}
  bookList : Object = {};
  getBooks(list : string) {
    if (Object.keys(this.bookList).length) return Observable.create( obs => {
      obs.next(this.bookList);
    })
    return this.http.get(`${Constants.baseURL}/books/${list || ''}`, Constants.headers)
      .map((response : Response) => {
        response.json().map( e => this.bookList[e.uuid] = new Book(e));
        return this.bookList;
      })
  }
  getBook(uuid : string) : Observable<Book> {
    console.log(uuid);
    return Observable.create( obs => obs.next(this.bookList[uuid]));
  }
}
