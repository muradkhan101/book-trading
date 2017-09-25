import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserInfoService {
  user : User;
  getUser(id: string) : Promise< User > {
    var _this = this;
    if (this.user) return Promise.resolve(this.user);
    return new Promise(function(resolve, reject) {
      window.setTimeout(()=>{
        console.log('in promise')
        var u = new User('1', 'Potato Head', 'potato@head.com', 'poopypants');
        _this.setUser(u);
        resolve(u);
      }, 500)
    })
  }
  setUser(user : User) {
    this.user = user;
  }
}
