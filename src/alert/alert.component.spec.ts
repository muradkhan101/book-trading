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
  let alertServiceStub = {
    retrieveMessage : () => subject,
  }
  // async lets you load components that have external html/css/etc files since reading files is an async action
  // compileComponents is the async function that loads html/css
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      // Provide a stub service instead of the real thing
      providers : [ { provide : AlertService, alertServiceStub } ],
    })
    .compileComponents();
  }));

  // Second synchronous beforeEach to load up variables
  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    de = fixture.debugElement.query(By.css('div'));
    el = de.nativeElement;
  })

  it('should be empty', () => {
    fixture.detectChanges();
    expect(el.textContent).toEqual('');
  })

  describe('Error messages', () => {
    let message : string;
    beforeEach( () => {
      message = 'ITS BROKEDED';
      component.message = { type: 'error', message : message };
      fixture.detectChanges();
    })

    it('should have an error message', () => {
      expect(el.textContent).toEqual(message);
    })

    it('should have the `error` class', () => {
      expect(el.classList).toContain('alert-danger')
    })
  })

  describe('Error messages', () => {
    let message : string;
    beforeEach( () => {
      message = 'SUCCESSSSSS';
      component.message = { type: 'error', message : message };
      fixture.detectChanges();
    })

    it('should have a success message', () => {
      expect(el.textContent).toEqual(message);
    })

    it('should have the `success` class', () => {
      expect(el.classList).toContain('alert-success')
    })
  })
})
