import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as Constants from '../assets/config';

import { User } from '../user/user';
import { AlertService } from '../alert/alert.service';
@Injectable()
export class UserAuthenticationService {
  constructor (private http: Http, private alert: AlertService) {}

  redirectUrl : String;

  login(loginCredentials) {
    return this.http.post(`${Constants.baseURL}/user/login`, JSON.stringify(loginCredentials))
      .subscribe((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.alert.success('Log-in successful!');
          return true;
        }
        this.alert.error('Whoops! Your username or password was incorrect.');
        return false;
      })
  }

  logout() {localStorage.removeItem('currentUser')}

  isAuthenticated() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {return true;}
    return false;
  }

  private jwt() {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type': 'application/json, */*'});
          return new RequestOptions({ headers: headers });
      }
  }

}
