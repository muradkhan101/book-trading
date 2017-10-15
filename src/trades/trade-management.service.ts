import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import * as Constants from '../assets/config';

import { Trade } from './trade';
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
      .map((response : Response) => {
        let trades = response.json();
        if (trades) return trades.map(e => new Trade(e))
        return [];
      })
  }
  getOne(tradeId) {
    return this.http.get(`${Constants.baseURL}/trades/${tradeId}`, this.jwt())
      .subscribe((response : Response) => response.json())
  }
  getForBook(bookId) {
    return this.http.get(`${Constants.baseURL}/books/${bookId}/trades`)
      .map((response : Response) => {
        let trades = response.json();
        if (trades) return trades.map(e => new Trade(e))
        return [];
      })
  }
  create(tradeInfo) {
    if (!this.isAuthenticated()) {
      UserAuthenticationService.redirectUrl = this.router.url;
      this.alert.error('Please login and try again', true);
      return this.router.navigate(['/login']);
    }
    return this.http.post(`${Constants.baseURL}/trades`, tradeInfo, this.jwt())
      .catch(error => {
        if (error.status == 400) this.alert.error('There was a problem with the submitted data, sorry :(');
        else this.alert.error('Whoops! Something might be wrong on our end. Please try again in a few minutes!');
        return Observable.of({error: true})
      })
      .subscribe((response : Response) => {
        if (response.hasOwnProperty('error')) return;
        this.alert.success('Congrats! Your trade request was added to the system!');
        return response.json();
      })
  }
  update(newInfo) {
    if (!this.isAuthenticated()) {
      UserAuthenticationService.redirectUrl = this.router.url;
      return this.router.navigate(['/login']);
    }
    return this.http.put(`${Constants.baseURL}/trades`, newInfo, this.jwt())
      .catch(error => {
        if (error.status == 204) this.alert.error('We couldn\'t find that trade in our systems.');
        else this.alert.error('Whoops! Something might be wrong on our end. Please try again in a few minutes!');
        return Observable.of({error: true})
      })
      .subscribe((response : Response) => {
        if (response.hasOwnProperty('error')) return;
        this.alert.success('Hooray! Your trade information was updated!');
        return response.json();
      })
  }
  delete(tradeId) {
    if (!this.isAuthenticated()) {
      UserAuthenticationService.redirectUrl = this.router.url;
      return this.router.navigate(['/login']);
    }
    return this.http.delete(`${Constants.baseURL}/trades/${tradeId}`, this.jwt())
      .catch(error => {
        if (error.status == 400) this.alert.error('We couldn\'t find that trade in our systems.');
        else this.alert.error('Whoops! Something might be wrong on our end. Please try again in a few minutes!');
        return Observable.of({error: true})
      })
      .subscribe((response : Response) => {
        if (response.hasOwnProperty('error')) return;
        this.alert.success('The trade was deleted from our systems.')
        return response.json();
      })
  }
}
