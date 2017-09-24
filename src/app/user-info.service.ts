import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserInfoService {
  getUser(id: string) : Promise< User > {
    return new Promise(function(resolve, reject) {
      window.setTimeout(()=>{
        resolve(new User('1', 'Potato Head', 'potato@head.com'))
      }, 1000)
    })
  }
}
