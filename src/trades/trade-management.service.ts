import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as Constants from '../assets/config';

import { UserAuthenticationService } from '../global_services/user-authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class TradeManagementService extends UserAuthenticationService {
  constructor(public http: Http, public alert: AlertService, public router: Router ) {
    super(http, alert, router);
  }

  getAll() {
    return this.http.get(`${Constants.baseURL}/trades`, this.jwt())
      .subscribe((response : Response) => response.json())
  }
  getOne(tradeId) {
    return this.http.get(`${Constants.baseURL}/trades/${tradeId}`, this.jwt())
      .subscribe((response : Response) => response.json())
  }
  create(tradeInfo) {
    if (!this.isAuthenticated()) {
      UserAuthenticationService.redirectUrl = this.router.url;
      this.router.navigate(['/login']);
    }
    return this.http.post(`${Constants.baseURL}/trades`, tradeInfo, this.jwt())
      .subscribe((response : Response) => response.json())
  }
  update(tradeId, newInfo) {
    if (!this.isAuthenticated()) {
      UserAuthenticationService.redirectUrl = this.router.url;
      this.router.navigate(['/login']);
    }
    return this.http.post(`${Constants.baseURL}/trades/${tradeId}`, newInfo, this.jwt())
      .subscribe((response : Response) => response.json())
  }
  delete(tradeId) {
    if (!this.isAuthenticated()) {
      UserAuthenticationService.redirectUrl = this.router.url;
      this.router.navigate(['/login']);
    }
    return this.http.delete(`${Constants.baseURL}/trades/${tradeId}`, this.jwt())
      .subscribe((response : Response) => response.json())
  }
}
