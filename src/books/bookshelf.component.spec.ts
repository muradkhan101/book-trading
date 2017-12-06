import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { BookshelfComponent } from './bookshelf.component';
import { LibraryService } from './library.service';
import { Book } from './book';
import { KeysPipe } from '../directives/keys.pipe';


@Component({
  selector: 'book-link',
  template: `
  <div>
    <h1>{{book.title}}</h1>
    <p>{{book.description}}</p>
  </div>
  `,
})
class TestBookLinkComponent {
  @Input() book : Book;
}


describe('Bookshelf Component ', () => {

  let component : BookshelfComponent;
  let fixture : ComponentFixture<BookshelfComponent>;
  let de : DebugElement;
  let el : HTMLElement;
  let libraryService : LibraryService;
  let spy;
  let bookList = {
    'aasdf':
      new Book({
        title : 'Book One',
        description : 'A book about how to test Angular stuff',
        image : 'http://media.gettyimages.com/photos/josephine-vander-gucht-of-the-band-oh-wonder-visits-build-studios-to-picture-id674267924',
        uuid : '123abc999',
        published : 'Dec 13, 1914',
        author : 'Merlin the Wizard',
        _id : '123abc999',
      }),
    'booi':
      new Book({
        title : 'Book One',
        description : 'A book about how to test Angular stuff',
        image : 'http://media.gettyimages.com/photos/josephine-vander-gucht-of-the-band-oh-wonder-visits-build-studios-to-picture-id674267924',
        uuid : '123abc999',
        published : 'Dec 13, 1914',
        author : 'Merlin the Wizard',
        _id : '123abc999',
      }),
    'dsfb' :
      new Book({
        title : 'Book Two',
        description : 'A book about how to write how tos',
        image : 'http://media.gettyimages.com/photos/josephine-vander-gucht-of-the-band-oh-wonder-visits-build-studios-to-picture-id674267924',
        uuid : '123abc999',
        published : 'Dec 13, 1914',
        author : 'King Arthur',
        _id : '123abc999',
      }),
    };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BookshelfComponent, KeysPipe, TestBookLinkComponent ],
      providers: [ LibraryService ],
      imports : [ HttpModule, BrowserAnimationsModule ],
    });

    fixture = TestBed.createComponent(BookshelfComponent);
    component = fixture.componentInstance;
    libraryService = fixture.debugElement.injector.get(LibraryService);
    component.title = 'All Books'
    // Spy intercepts function calls and replaces return value with given
    spy = spyOn(libraryService, 'getBooks')
          .and.returnValue(Observable.of(bookList))
    de = fixture.debugElement.query(By.css('.container-fluid'))
    el = de.nativeElement;
  })

  it('should not have book list yet', () => {
    expect(spy.calls.any()).toBe(false)
  })

  it('should have the title', () => {
    fixture.detectChanges();
    expect(el.firstElementChild.textContent).toContain('All Books');
  })

  it('should have the list of books', async() => {
    // Detech changes makes onInit be called which makes service get list of books
    fixture.detectChanges();
    // When stable resolves when async thing is done
    fixture.whenStable().then(() => {
      // This one updates view with books
      fixture.detectChanges();
      expect(el.lastElementChild.tagName).toBe('DIV')
    })
  })

  it('should have the same number of books as bookList', () => {
    fixture.detectChanges()
    console.log(el)
    expect(el.lastElementChild.childElementCount).toEqual(Object.keys(bookList).length)
  })
})
