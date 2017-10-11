import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import * as Constants from '../assets/config';
import { User } from '../user/user';
import { AlertService } from '../alert/alert.service';

import { Observable } from 'rxjs';

@Injectable()
export class UserAuthenticationService {
  constructor (public http: Http, public alert: AlertService, public router: Router) {}

  static redirectUrl : String;

  login(loginCredentials) {
    return this.http.post(`${Constants.baseURL}/user/login`, loginCredentials, this.jwt())
      .catch(error => {
        if (error.status == 403) this.alert.error('Whoops! Your username or password was incorrect.');
        else this.alert.error('Whoops! Something might be wrong on our end. Please try again in a few minutes!');
        return Observable.of({error: true})
      })
      .subscribe((response: Response) => {
        if (response.hasOwnProperty('error')) return;
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.alert.success('Log-in successful!');
          if (UserAuthenticationService.redirectUrl) {
            this.router.navigate([UserAuthenticationService.redirectUrl]);
            UserAuthenticationService.redirectUrl = undefined;
          }
          return true;
        }
        return false;
      })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {return true;}
    return false;
  }

  jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type': 'application/json, */*'});
        return new RequestOptions({ headers: headers });
    }
  }

}
