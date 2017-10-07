import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// routerLink is equivalent to href for a Single Page App, navs to a path in routing module
// routerLinkActive is class given when you are at that link
// router-outlet is where the component for that route will display
@Component({
  selector: 'app-main',
  template: `
  <div ngClass='container-fluid no-padding'>
    <div ngClass='full-height row align-items-center'>
      <div ngClass='col-md-3'>
        <nav ngClass='navbar navbar-toggleable-md navbar-expand-md navbar-light bg-light'>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div ngClass='collapse navbar-collapse flex-column mr-auto ml-auto' id='main-navbar'>
            <a ngClass='nav-item nav-link'routerLink='/books' routerLinkActive='active'>Books</a>
            <a ngClass='nav-item nav-link' routerLink='/trades' routerLinkActive='active'>Trades</a>
            <a ngClass='nav-item nav-link' routerLink='/user/profile' routerLinkActive='active'>My Profile</a>
          </div>
        </nav>
      </div>
      <div ngClass='col'>
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
  styles: ['.no-padding {padding-left: 0; padding-right: 0;}']
})

export class AppComponent {}
