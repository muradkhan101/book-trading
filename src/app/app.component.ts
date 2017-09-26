import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// routerLink is equivalent to href for a Single Page App, navs to a path in routing module
// routerLinkActive is class given when you are at that link
// router-outlet is where the component for that route will display
@Component({
  selector: 'app-main',
  template: `
  <div ngClass='container'>
    <nav>
      <a routerLink='/books' routerLinkActive='active'>Books</a>
      <a routerLink='/trades' routerLinkActive='active'>Trades</a>
      <a routerLink='/user/profile' routerLinkActive='active'>Log-in</a>
    </nav>
    <router-outlet></router-outlet>
  </div>
  `
})

export class AppComponent {}
