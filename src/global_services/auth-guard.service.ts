import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                     from '@angular/router';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService : UserAuthenticationService, private router : Router) {}

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    return this.checkLogin(state.url)
  }

  checkLogin(url : String) : boolean {
    if (this.authService.isAuthenticated()) {return true;}
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
