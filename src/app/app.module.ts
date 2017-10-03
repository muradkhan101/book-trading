import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BooksModule } from '../books/books.module';
import { UserInfoComponent } from '../user/user-info.component';
import { UserInfoService } from '../user/user-info.service';
import { UserAuthenticationService } from '../user/user-authentication.service';

import { LoginModule } from '../login/login.module';

import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BooksModule,
    LoginModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [UserInfoService, UserAuthenticationService],
  bootstrap: [AppComponent]
})

export class AppModule {}
