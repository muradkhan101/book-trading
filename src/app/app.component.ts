import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
