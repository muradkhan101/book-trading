import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLandingComponent } from './app-landing.component';

import { BooksModule } from '../books/books.module';
import { UserInfoComponent } from '../user/user-info.component';

import { UserAuthenticationService } from '../global_services/user-authentication.service';
import { LoginModule } from '../login/login.module';
import { AuthGuard } from '../global_services/auth-guard.service';

import { HttpModule } from '@angular/http';

import { ModalModule } from '../modal/modal.module';
import { DirectivesModule } from '../directives/directives.module';
import { TradesModule } from '../trades/trades.module';

@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    AppLandingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BooksModule, // Order of import matters here, load base routes last since routes take precedence by ordering
    LoginModule,
    AppRoutingModule,
    HttpModule,
    ModalModule,
    TradesModule,
    DirectivesModule // Have to put things in module to use them in multiple modules
  ],
  providers: [
    UserAuthenticationService,
    AuthGuard
 ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
