import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { User } from './user';

@Injectable()
export class UserAuthenticationService {
  baseURL : string = 'http://localhost:3000';

  constructor (private http: Http) {}

  login(loginCredentials) {
    return this.http.post(`${this.baseURL}/user/authenticate`, JSON.stringify(loginCredentials))
      .subscribe((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
        }
      })
  }

  logout() {localStorage.removeItem('currentUser')}

  isAuthenticated() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.token) {return true;}
    return false;
  }
}
