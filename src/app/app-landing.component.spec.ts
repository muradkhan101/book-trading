import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppLandingComponent } from './app-landing.component';

describe('AppLandingComponent (template)', () => {
  let component : AppLandingComponent;
  let fixture   : ComponentFixture<AppLandingComponent>;
  let de : DebugElement;
  let el : HTMLElement;

  // Set up a base state for each test
  // Instantiate mock services, data, components, etc.
  beforeEach(() => {
    // Test bed is a testing ngModule loader, basically makes a backbone to load component into
    // Takes ngModule style metadata object as input
    TestBed.configureTestingModule({
      declarations : [ AppLandingComponent ],
    })

    fixture = TestBed.createComponent(AppLandingComponent);
    component = fixture.componentInstance;
    // Searches DOM for first element to match given CSS
    de = fixture.debugElement.query(By.css('.col-10'));
    el = de.nativeElement;

  })

  it('should contain `Book Trading`', () => {
    // Detect changes causes data in component to propogate through (initates data binding / lifecycle hooks)
    // Updates text, imgs, etc. Normally done automatically, have to do manually w/ TestBed
    fixture.detectChanges();
    expect(el.textContent).toContain('Book Trading');
  })

  it('should contain `Replace your old books`', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain('Replace your old books');
  })

})
