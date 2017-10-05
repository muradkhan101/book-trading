import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as Constants from '../assets/config';

@Injectable()
export class TradeManagementService {
  constructor(private http: Http) {}
  getAll() {
    return this.http.get(`${Constants.baseURL}/trades`)
      .subscribe(response : Response => response.json())
  }
  getOne(tradeId) {
    return this.http.get(`${Constants.baseURL}/trades/${tradeId}`)
      .subscribe(response : Response => response.json())
  }
  create(tradeInfo) {
    return this.http.post(`${Constants.baseURL}/trades`, tradeInfo)
      .subscribe(response : Response => response.json())
  }
  update(tradeId, newInfo) {
    return this.http.post(`${Constants.baseURL}/trades/${tradeId}`, newInfo)
      .subscribe(response : Response => response.json())
  }
  delete(tradeInfo) {
    return this.http.delete(`${Constants.baseURL}/trades/${tradeId}`, newInfo)
      .subscribe(response : Response => response.json())
  }
}
