import { Injectable } from '@angular/core';

import { Book } from './book';

const fakeBooks : Book[] = [
  new Book(1, 'Tale of Three Ditties', 'A book about the creation of three of the world\'s most loved songs'),
  new Book(2, 'Of Lice in Den', 'A heart-wrenching story about how a lice infestation destroyed a bear\'s life'),
  new Book(3, 'Ride and Prejudice', 'Amusement park goers judge eachother for the types of rides each enjoys'),
  new Book(4, 'Drank and Fine', 'An alcoholic doesn\'t see how her drinking is causing her to destroy her relationships and push her friends away')
];

@Injectable()
export class LibraryService {

  getBooks(list : string) : Promise< Book[] > {
    return new Promise(function(resolve, reject) {
      window.setTimeout(() => resolve(fakeBooks), 500)
    })
  }

  getBook(id : number) : Promise< Book > {
    return new Promise(function(resolve, reject) {
      window.setTimeout(() => resolve(fakeBooks[id-1]), 300)
    })
  }
}
