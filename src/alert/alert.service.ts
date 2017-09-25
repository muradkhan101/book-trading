import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepNavForChange = false;

  constructor(router: Router) {
    router.events.subscribe(event => {
      // If we're about to navigate to another page
      if (event instanceof NavigationStart) {
        // keep the alert for the first time we navigate
        if (this.keepNavForChange) {
          this.keepNavForChange = false;
        // otherwise get rid of it
        } else {
          this.subject.next()
        }
      }
    })
  }

  success(message : string, keepNavForChange = false) {
    this.keepNavForChange = keepNavForChange;
    this.subject.next({type: 'success', message: message})
  }

  error(message : string, keepNavForChange = false) {
    this.keepNavForChange = keepNavForChange;
    this.subject.next({type: 'error', message: message})
  }
  retrieveMessage() : Observable<any> {
    return this.subject.asObservable();
  }
}
