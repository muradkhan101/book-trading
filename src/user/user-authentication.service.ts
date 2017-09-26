import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { User } from './user';

@Injectable()
export class UserAuthenticationService {
  baseURL : string = 'someurl';

  constructor (private http: Http) {}

  login(email : String, password : String) {
    return this.http.post(`this.baseURL/user/authenticate`, JSON.stringify({email, password}))
      .map((response: Response) => {
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
