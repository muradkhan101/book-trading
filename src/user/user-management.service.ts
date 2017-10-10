import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import * as Constants from '../assets/config';

import { User } from './user';

// Missing the @ symbol can give failed to resolve parameters error
@Injectable()
export class UserManagementService {
  constructor (private http : Http) {}


  create(userInfo) {
    return this.http.post(`${Constants.baseURL}/user`, userInfo, Constants.headers)
            .subscribe((response : Response) => response.json())
  }

  update(userInfo) {
    return this.http.put(`${Constants.baseURL}/user`, userInfo, Constants.headers)
            .subscribe((response : Response) => response.json())
  }

  delete(userInfo) {
    return this.http.delete(`${Constants.baseURL}/user/${userInfo.id}`, Constants.headers)
            .subscribe((response : Response) => response.json())
  }

  get(userInfo) {
    return this.http.get(`${Constants.baseURL}/user/${userInfo.id}`, Constants.headers)
            .subscribe((response : Response) => response.json())
  }

}
