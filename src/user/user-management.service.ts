import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from './user';

Injectable()
export class UserManagementService {
  constructor (private http : Http) {}

  baseURL : String = 'someurl';

  private headers = new Headers({'Content-Type': 'application/json, */*'})

  create(user : User ) {
    return this.http.post(`${this.baseURL}/user`, user, this.headers)
            .map((response : Response) => response.json())
  }

  update(user : User ) {
    return this.http.put(`${this.baseURL}/user`, user, this.headers)
            .map((response : Response) => response.json())
  }

  delete(user : User ) {
    return this.http.delete(`${this.baseURL}/user/${user.id}`, this.headers)
            .map((response : Response) => response.json())
  }

  get(user : User ) {
    return this.http.get(`${this.baseURL}/user/${user.id}`, this.headers)
            .map((response : Response) => response.json())
  }

  private jwt() {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
          return new RequestOptions({ headers: headers });
      }
  }
}
