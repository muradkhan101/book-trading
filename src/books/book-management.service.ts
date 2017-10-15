import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import * as Constants from '../assets/config';
import { UserAuthenticationService } from '../global_services/user-authentication.service';
import { AlertService } from '../alert/alert.service';


@Injectable()
export class BookManagementService extends UserAuthenticationService {
  constructor(public http: Http,
              public router: Router,
              public alert: AlertService,
              private userAuth: UserAuthenticationService
            ) { super(http, alert, router); }
  addToCollection(_id : string) {
    let currentUser = this.userAuth.isAuthenticated();
    if (!currentUser) {
      UserAuthenticationService.redirectUrl = this.router.url;
      this.alert.error('Please login and try again', true);
      return this.router.navigate(['/login']);
    }
    return this.http.post(`${Constants.baseURL}/user/${currentUser.uuid}/books`, {_id: _id}, this.jwt())
      .catch(error => {
        if (error.status == 400) this.alert.error('There was a problem with the submitted data, sorry :(');
        else if (error.status == 409) this.alert.error('You already have this book in your collection!');
        else this.alert.error('Whoops! Something might be wrong on our end. Please try again in a few minutes!');
        return Observable.of({error: true})
      })
      .subscribe((response : Response) => {
        if (response.hasOwnProperty('error')) return;
        this.alert.success('This book was added to your collection!');
        return ;
      })
  }
  removeFromCollection(_id : string) {
    let currentUser = this.userAuth.isAuthenticated();
    if (!currentUser) {
      UserAuthenticationService.redirectUrl = this.router.url;
      this.alert.error('Please login and try again', true);
      return this.router.navigate(['/login']);
    }
    return this.http.delete(`${Constants.baseURL}/user/${currentUser.uuid}/books/${_id}`, this.jwt())
      .catch(error => {
        if (error.status == 400) this.alert.error('There was a problem with the submitted data, sorry :(');
        else this.alert.error('Whoops! Something might be wrong on our end. Please try again in a few minutes!');
        return Observable.of({error: true})
      })
      .subscribe((response : Response) => {
        if (response.hasOwnProperty('error')) return;
        this.alert.success('This book was removed from your collection!');
        return ;
      })
  }
}
