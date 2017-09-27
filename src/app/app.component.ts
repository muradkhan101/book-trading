import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
// routerLink is equivalent to href for a Single Page App, navs to a path in routing module
// routerLinkActive is class given when you are at that link
// router-outlet is where the component for that route will display
@Component({
  selector: 'app-main',
  template: `
  <div ngClass='container-fluid'>
    <div ngClass='row collapse'>
      <div ngClass='col-3 collapse navbar-collapse' id='main-navbar'>
        <nav ngClass='navbar navbar-expand-sm'>
          <ul ngClass='navbar-nav flex-column mr-auto ml-auto'>
            <li ngClass='nav-item'>
              <a ngClass='nav-link'routerLink='/books' routerLinkActive='active'>Books</a>
            </li>
            <li ngClass='nav-item'>
              <a ngClass='nav-link' routerLink='/trades' routerLinkActive='active'>Trades</a>
            </li>
            <li ngClass='nav-item'>
              <a ngClass='nav-link' routerLink='/user/profile' routerLinkActive='active'>Log-in</a>
            </li>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </ul>
        </nav>
      </div>
      <div ngClass='col'>
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./bootstrap.min.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {}
