import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import * as Constants from '../assets/config';

import { UserAuthenticationService } from '../global_services/user-authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

import { User } from './user';

// Missing the @ symbol can give failed to resolve parameters error
@Injectable()
export class UserManagementService extends UserAuthenticationService {
  //When extending, still have to pass in injected components to constructor
  constructor (public http: Http, public alert: AlertService, public router: Router) {
    super(http, alert, router);
  }

  create(userInfo) {
    return this.http.post(`${Constants.baseURL}/user`, userInfo, this.jwt())
            .subscribe((response : Response) => response.json())
  }

  update(userInfo) {
    return this.http.put(`${Constants.baseURL}/user`, userInfo, this.jwt())
            .subscribe((response : Response) => response.json())
  }

  delete(userInfo) {
    return this.http.delete(`${Constants.baseURL}/user/${userInfo.id}`, this.jwt())
            .subscribe((response : Response) => response.json())
  }

  get(userInfo) {
    return this.http.get(`${Constants.baseURL}/user/${userInfo.id}`, this.jwt())
            .subscribe((response : Response) => response.json())
  }

}
