import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

describe('Alert Component', () => {
  let component : AlertComponent;
  let fixture : ComponentFixture<AlertComponent>;
  let de : DebugElement;
  let el : HTMLElement;
  let subject : Subject<any> = new Subject<any>();
  let alertServiceStub;
  let alertService;

  // async lets you load components that have external html/css/etc files since reading files is an async action
  // compileComponents is the async function that loads html/css
  beforeEach(async(() => {
    alertServiceStub = {
      retrieveMessage : () => subject,
    }
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      // Provide a stub service instead of the real thing
      providers : [ { provide : AlertService, useValue: alertServiceStub } ],
    })
    .compileComponents();
  }));

  // Second synchronous beforeEach to load up variables
  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    // Below is for when you want to inject actual service
    // alertService = fixture.debugElement.injector.get(AlertService);

    // Because of ngIf based on message, need to initialize with something to get query to work
    component.message = { type: 'none', text : ''};
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.alert'));
    el = de.nativeElement;
  })

  it('should be empty', () => {
    fixture.detectChanges();
    // Adds a newline character for some reason
    expect(el.textContent).toEqual('\n');
  })

  describe('Error messages', () => {
    let message : string;
    beforeEach( () => {
      message = 'ITS BROKEDED';
      component.message = { type: 'error', text : message };
      fixture.detectChanges();
    })

    it('should have an error message', () => {
      expect(el.textContent).toContain(message);
    })

    it('should have the `error` class', () => {
      expect(el.classList).toContain('alert-danger')
    })
  })

  describe('Success messages', () => {
    let message : string;
    beforeEach( () => {
      message = 'SUCCESSSSSS';
      component.message = { type: 'success', text : message };
      fixture.detectChanges();
    })

    it('should have a success message', () => {
      expect(el.textContent).toContain(message);
    })

    it('should have the `success` class', () => {
      expect(el.classList).toContain('alert-success')
    })
  })
})
